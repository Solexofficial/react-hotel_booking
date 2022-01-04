import SettingsIcon from '@mui/icons-material/Settings';
import { MenuItem, MenuList } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { userProfileRoutes, adminRoutes } from '../../../router/routes';

const Sidebar = () => {
  const { currentUser } = useAuth();

  const routes = currentUser.role === 'admin' ? adminRoutes : userProfileRoutes;
  return (
    <MenuList className='sidebar'>
      {routes.map(route => (
        <MenuItem
          key={route.path}
          name={route.name}
          component={NavLink}
          className='sidebar-menu__item'
          to={route.path}
          exact
        >
          {route?.icon} {route.name}
        </MenuItem>
      ))}
      <MenuItem className='sidebar-menu__item' component={NavLink} name='edit' to='/profile/edit' exact>
        <SettingsIcon />
        Редактировать профиль
      </MenuItem>
    </MenuList>
  );
};

export default Sidebar;
