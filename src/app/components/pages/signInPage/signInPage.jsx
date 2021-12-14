import { Paper } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../common/container';
import Footer from '../../common/footer/footer';
import Header from '../../common/header/header';
import Button from '../../ui/buttons/button';
import LoginForm from '../../ui/forms/loginForm';

const LoginPage = () => {
  return (
    <>
      <Header />
      <Container>
        <h1 className='visually-hidden'>Отель Toxin Войти в личный кабинет</h1>
        <div className='login-form__wrapper'>
          <Paper elevation={3} className='form-card login-form__card'>
            <h2>Войти</h2>
            <LoginForm />
            <div className='login-form__footer'>
              <span>Нет аккаунта на Toxin?</span>
              <Link to='./signUp' className='login-form__link'>
                <Button variant='outlined' size='small'>
                  Зарегистрироваться
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
