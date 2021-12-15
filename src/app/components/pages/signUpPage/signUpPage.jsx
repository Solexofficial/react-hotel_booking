import { Paper } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../common/container';
import Footer from '../../common/footer/footer';
import Header from '../../common/header/header';
import Button from '../../ui/buttons/button';
import RegisterForm from '../../ui/forms/registerForm';

const LoginPage = () => {
  return (
    <>
      <Header />
      <Container>
        <h1 className='visually-hidden'>Отель Toxin Регистрация</h1>
        <div className='login-form__wrapper'>
          <Paper elevation={3} className='form-card login-form__card'>
            <h2>Регистрация</h2>
            <RegisterForm />
            <div className='login-form__footer'>
              <span>Уже есть аккаунт на Toxin?</span>
              <Link to='./signIn' className='login-form__link'>
                <Button variant='outlined' size='small'>
                  Войти
                </Button>
              </Link>
            </div>
          </Paper>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default LoginPage;
