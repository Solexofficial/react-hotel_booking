import { UserType, SignInDataType } from './../types/types';
import axios from 'axios';
import localStorageService from './localStorage.service';
import config from '../config.json';

const httpAuth = axios.create({
  baseURL: `${config.apiEndPoint}/auth/`,
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const authService = {
  signUp: async (payload: UserType) => {
    const { data } = await httpAuth.post(`signUp`, payload);
    return data;
  },
  signIn: async ({ email, password }: SignInDataType) => {
    const { data } = await httpAuth.post(`signInWithPassword`, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post('token', {
      grant_type: 'refresh_token',
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
