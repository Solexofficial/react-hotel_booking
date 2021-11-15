import { AppBar, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../ui/buttons/button';
import Container from '../container';
import Logo from '../logo/logo';
import useStyles from './styles';

const Header = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container>
        <AppBar position='static' color='inherit' className={classes.headerWrapper}>
          <Toolbar className={classes.headerInner}>
            <Box>
              <Logo />
            </Box>
            <Box>
              <NavLink to='/login' className={classes.headerLink}>
                <Button size='small' variant='outlined' className={classes.headerLinkButton}>
                  Войти
                </Button>
              </NavLink>
              <NavLink to='/login' className={classes.headerLink}>
                <Button size='small'>Зарегистрироваться</Button>
              </NavLink>
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  );
};

export default Header;
