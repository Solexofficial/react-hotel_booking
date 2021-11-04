import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeLogo from '../icons/logo';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, zIndex: 1000, mt: '10px' }}>
      <AppBar position='static' color='inherit' sx={{ borderRadius: 2 }}>
        <Toolbar>
          <HomeLogo viewBox='0 0 40 40' />
          <Typography
            variant='h6'
            component='h1'
            sx={{ textTransform: 'uppercase', ml: '13px', fontWeight: 400, flexGrow: 1 }}
          >
            Toxin
          </Typography>
          <NavLink to='/login' style={{ textDecoration: 'none' }}>
            <Button variant='outlined' size='small' sx={{ mr: 2 }}>
              Войти
            </Button>
          </NavLink>
          <NavLink to='/login' style={{ textDecoration: 'none' }}>
            <Button variant='contained' size='small'>
              Зарегистрироваться
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
