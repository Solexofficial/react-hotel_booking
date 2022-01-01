import { Paper } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../common/Container/Container';
import Footer from '../../common/Footer/Footer';
import Header from '../../common/Header/Header';
import Button from '../../ui/buttons/button';
import LoginForm from '../../ui/forms/LoginForm';

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
