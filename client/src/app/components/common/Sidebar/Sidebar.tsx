import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { MenuItem, MenuList } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCurrentUserData } from '../../../store/users';

const Sidebar = () => {
  const currentUser = useSelector(getCurrentUserData());

  return (
    <MenuList className='sidebar'>
      <MenuItem component={NavLink} className='sidebar-menu__item' to={`/profile/${currentUser?._id}`} exact>
        <AccountCircleIcon />
        Мой профиль
      </MenuItem>
      {currentUser?.role === 'admin' && (
        <MenuItem
          component={NavLink}
          className='sidebar-menu__item'
          to={`/profile/${currentUser?._id}/dashboard`}
          exact
        >
          <AdminPanelSettingsIcon />
          Панель администратора
        </MenuItem>
      )}
      <MenuItem component={NavLink} className='sidebar-menu__item' to={`/profile/${currentUser?._id}/booking`} exact>
        <StarBorderIcon />
        Мои Бронирования
      </MenuItem>
      <MenuItem component={NavLink} className='sidebar-menu__item' to={`/profile/${currentUser?._id}/likes`} exact>
        <FavoriteBorderIcon />
        Понравилось
      </MenuItem>
      <MenuItem component={NavLink} className='sidebar-menu__item' to={`/profile/${currentUser?._id}/favorites`} exact>
        <BookmarkBorderIcon />
        Избранное
      </MenuItem>

      <MenuItem className='sidebar-menu__item' component={NavLink} to={`/profile/${currentUser?._id}/edit`}>
        <SettingsIcon />
        Редактировать профиль
      </MenuItem>
    </MenuList>
  );
};

export default Sidebar;
