import { Card, Container } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Footer from '../../components/common/footer/footer';
import Header from '../../components/common/header/header';
import Text from '../../components/common/typography/text';
import Title from '../../components/common/typography/title';
import Button from '../../components/ui/buttons/button';
import LoginForm from '../../components/ui/forms/loginForm/loginForm';
import RegisterForm from '../../components/ui/forms/registerForm/registerForm';
import useStyles from './styles';

const Login = () => {
  const classes = useStyles();

  const [formType, setFormType] = useState('signIn');

  const toggleFormType = () => {
    setFormType(prevState => (prevState === 'signUp' ? 'signIn' : 'signUp'));
  };

  return (
    <>
      <Header />
      <Container>
        <Box className={classes.rootWrapper}>
          <Card className={classes.formWrapper}>
            {formType === 'signIn' ? (
              <>
                <Title isBold component='h2' variant='h5'>
                  Войти
                </Title>
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
                <Title isBold component='h2' variant='h5'>
                  Регистрация
                </Title>
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
      <Footer />
    </>
  );
};

export default Login;
