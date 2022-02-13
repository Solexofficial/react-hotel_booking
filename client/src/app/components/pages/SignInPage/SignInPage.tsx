import { Paper } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import LoginForm from '../../ui/forms/LoginForm';

const SignInPage: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default SignInPage;
