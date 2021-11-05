import { Container } from '@mui/material';
import React from 'react';
import Header from '../components/common/header';
import LoginForm from '../components/ui/loginForm';

const Login = () => {
  return (
    <Container>
      <Header />
      <LoginForm />
    </Container>
  );
};

export default Login;
