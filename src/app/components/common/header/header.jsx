import { AppBar, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';
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
            <Box>
              <NavLink to='/login' className={classes.headerLink}>
                <Button size='small' className={classes.headerLinkButton}>
                  Войти
                </Button>
              </NavLink>
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  );
};

export default Header;
