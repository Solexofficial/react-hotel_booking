import React from 'react';
import SignInPage from '../../components/pages/signInPage/signInPage';
import SignUpPage from '../../components/pages/signUpPage/signUpPage';
import { useParams } from 'react-router';

const Login = () => {
  const { type } = useParams();
  return type === 'signUp' ? <SignUpPage /> : <SignInPage />;
};

export default Login;
