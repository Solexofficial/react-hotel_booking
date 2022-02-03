import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getCurrentUserData, logOut } from '../../../store/users';
import Avatar from '../../common/Avatar';
import Tooltip from '../../common/Tooltip';

const NavProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserData());

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickSettingsMenu = path => {
    history.push(path);
    handleCloseUserMenu();
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  if (currentUser) {
    const { avatarPhoto, firstName, secondName } = currentUser;
    return (
      <div className='profile-wrapper'>
        <Tooltip title='Открыть меню' placement='bottom'>
          <IconButton onClick={handleOpenUserMenu} className='profile-avatar__btn'>
            <Avatar alt='user-photo' src={avatarPhoto} />
          </IconButton>
        </Tooltip>
        <div className='profile-username__wrapper'>
          <span className='profile-username__greeting'>Добро пожаловать!</span>
          <div className='profile-username__name'>{`${firstName} ${secondName}`}</div>
        </div>
        <Menu
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          className='profile-menu'
        >
          <MenuItem
            className='profile-menu__item'
            name='profile'
            onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}`)}
          >
            <AccountCircleIcon />
            Профиль
          </MenuItem>
          {currentUser.role === 'admin' && (
            <MenuItem
              className='profile-menu__item'
              name='profile'
              onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/dashboard`)}
            >
              <AdminPanelSettingsIcon />
              Панель администратора
            </MenuItem>
          )}
          <MenuItem
            className='profile-menu__item'
            name='booking'
            onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/booking`)}
          >
            <StarBorderIcon />
            Мои Бронирования
          </MenuItem>
          <MenuItem
            className='profile-menu__item'
            name='likes'
            onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/likes`)}
          >
            <FavoriteBorderIcon />
            Понравилось
          </MenuItem>
          <MenuItem
            className='profile-menu__item'
            name='favorites'
            onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/favorites`)}
          >
            <BookmarkBorderIcon />
            Избранное
          </MenuItem>
          <MenuItem className='profile-menu__item' name='logout' onClick={handleLogOut}>
            <ExitToAppIcon />
            Выйти
          </MenuItem>
        </Menu>
      </div>
    );
  }
  return <>Loading...</>;
};

export default NavProfile;
