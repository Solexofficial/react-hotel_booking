import { AppBar, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../ui/buttons/button';
import NavList from '../../ui/navList';
import Container from '../container';
import Logo from '../logo/logo';
import useStyles from './styles';

const Header = () => {
  const classes = useStyles();
  const navigationRoutes = [
    { path: '/rooms', name: 'Доступные номера' },
    { path: '/', name: 'Услуги' },
    { path: '/', name: 'Вакансии' },
    { path: '/', name: 'Новости' },
    { path: '/', name: 'Соглашения' },
  ];

  const { currentUser, setCurrentUser } = useAuth();
  console.log(currentUser);

  return (
    <Box className={classes.root}>
      <Container>
        <AppBar position='static' color='inherit' className={classes.headerWrapper}>
          <Toolbar className={classes.headerInner}>
            <Box>
              <Logo />
            </Box>
            <Box>
              <NavList routes={navigationRoutes} spacing={2} />
            </Box>
            {currentUser ? (
              <>
                <div className='div'>{currentUser.firstName}</div>
                <div className='div'>{currentUser.email}</div>
              </>
            ) : (
              <Box>
                <NavLink to='/login/signIn' className={classes.headerLink}>
                  <Button size='small' variant='outlined' className={classes.headerLinkButton}>
                    Войти
                  </Button>
                </NavLink>
                <NavLink to='/login/signUp' className={classes.headerLink}>
                  <Button size='small' className={classes.headerLinkButton}>
                    Зарегистрироваться
                  </Button>
                </NavLink>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  );
};

export default Header;
