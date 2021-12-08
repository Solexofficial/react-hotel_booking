import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { setTokens } from '../services/localStorage.service';
import userService from '../services/user.service';

const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState({});

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
      console.log(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = { email: 'Пользователь с таким email уже существует' };
          throw errorObject;
        }
      }
    }
  }

  async function signIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        switch (message) {
          case 'USER_DISABLED':
            throw new Error('Учетная запись пользователя отключена администратором.');
          case 'EMAIL_NOT_FOUND':
          case 'INVALID_PASSWORD':
          case 'INVALID_EMAIL':
            throw new Error('Неверный email или пароль');
          default:
            throw new Error('Слишком много попыток входа, попробуйте позже');
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return <AuthContext.Provider value={{ signUp, signIn, currentUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
