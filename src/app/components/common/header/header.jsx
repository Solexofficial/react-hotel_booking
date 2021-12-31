import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { navigationRoutes } from '../../../router/routes';
import Button from '../../ui/buttons/button';
import NavList from '../navList';
import NavProfile from '../../ui/navProfile';
import Container from '../Container/Container';
import Divider from '../Divider/Divider';
import Logo from '../Logo';
import useStyles from './styles';

const Header = () => {
  const { currentUser, handleLogout } = useAuth();

  const classes = useStyles();

  return (
    <header className='header'>
      <Container>
        <div className='header__inner'>
          <Logo className='header__logo' />
          <NavList routes={navigationRoutes} spacing={2} className='header-nav' />
          {currentUser ? (
            <>
              <Divider orientation='vertical' flexItem className='header__divider' />
              <NavProfile user={currentUser} onLogout={handleLogout} />
            </>
          ) : (
            <div className='header-buttons'>
              <NavLink to='/login/signIn' className='header-buttons-button'>
                <Button size='small' variant='outlined'>
                  Войти
                </Button>
              </NavLink>
              <NavLink to='/login/signUp' className='header-buttons-button'>
                <Button size='small'>Зарегистрироваться</Button>
              </NavLink>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
