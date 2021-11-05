import { Card, Container } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import Header from '../../components/common/header';
import Text from '../../components/common/typography/text';
import Title from '../../components/common/typography/title';
import LoginForm from '../../components/ui/loginForm';
import RegisterForm from '../../components/ui/registerForm';
import useStyles from './styles';
import Button from '../../components/ui/buttons/Button';

const Login = () => {
  const classes = useStyles();
  const { type } = useParams();
  const [formType, setFormType] = useState(type === 'register' ? type : 'signIn');

  const toggleFormType = () => {
    setFormType(prevState => (prevState === 'register' ? 'signIn' : 'register'));
  };

  return (
    <Container>
      <Header />
      <Box className={classes.rootWrapper}>
        <Card className={classes.formWrapper}>
          {formType === 'register' ? (
            <>
              <Title isBold>Войти</Title>
              <LoginForm />
              <Box className={classes.formFooter}>
                <Text variant='subtitle2' component='h5'>
                  Нет аккаунта на Toxin?
                </Text>
                <Button variant='outlined' size='small' onClick={toggleFormType}>
                  Создать
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Title isBold>Регистрация</Title>
              <RegisterForm />
              <Box className={classes.formFooter}>
                <Text variant='subtitle2' component='h5'>
                  Уже есть аккаунт на Toxin?
                </Text>
                <Button variant='outlined' size='small' onClick={toggleFormType}>
                  Войти
                </Button>
              </Box>
            </>
          )}
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
