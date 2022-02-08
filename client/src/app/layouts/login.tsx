import React from 'react';
import SignInPage from '../components/pages/SignInPage';
import SignUpPage from '../components/pages/SignUpPage/SignUpPage';
import { useParams } from 'react-router';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Container from '../components/common/Container';

const Login: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  return (
    <>
      <Header />
      <Container />
      {type === 'signUp' ? <SignUpPage /> : <SignInPage />}
      <Footer />
    </>
  );
};

export default Login;
