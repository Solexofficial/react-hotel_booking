import { AppBar, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeLogo from '../../icons/logo';
import Button from '../../ui/buttons/button';
import Container from '../container';
import Title from '../typography/title';
import useStyles from './styles';

const Header = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container>
        <AppBar position='static' color='inherit' className={classes.headerWrapper}>
          <Toolbar className={classes.headerInner}>
            <Box>
              <NavLink to='/' className={classes.headerLinkLogo}>
                <HomeLogo viewBox='0 0 40 40' />
                <Title variant='h6' component='h1' className={classes.headerTitle}>
                  Toxin
                </Title>
              </NavLink>
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
