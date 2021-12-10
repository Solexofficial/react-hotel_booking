import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { navigationRoutes, profileSettingsRoutes } from '../../../router/routes';
import Button from '../../ui/buttons/button';
import NavList from '../../ui/navList';
import Profile from '../../ui/profile';
import Container from '../container';
import Divider from '../divider';
import Logo from '../logo/logo';
import useStyles from './styles';

const Header = () => {
  const { currentUser, handleLogout } = useAuth();
  const classes = useStyles();

  return (
    <header className='header'>
      <Container>
        <div className='header__inner'>
          <Logo />
          <NavList routes={navigationRoutes} spacing={2} />
          {currentUser ? (
            <>
              <Divider orientation='vertical' flexItem className='header__divider' />
              <Profile user={currentUser} settingsRoutes={profileSettingsRoutes} onLogout={handleLogout} />
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
