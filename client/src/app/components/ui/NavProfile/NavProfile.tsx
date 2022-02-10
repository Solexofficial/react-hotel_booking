import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserData, logOut } from '../../../store/users';
import history from '../../../utils/history';
import Avatar from '../../common/Avatar';
import Tooltip from '../../common/Tooltip';

const NavProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserData());

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickSettingsMenu = (path: string) => {
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
            <Avatar alt='user-photo' src={avatarPhoto || ''} />
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
            onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}`)}
          >
            <AccountCircleIcon />
            Профиль
          </MenuItem>
          {currentUser.role === 'admin' && (
            <MenuItem
              className='profile-menu__item'
              onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/dashboard`)}
            >
              <AdminPanelSettingsIcon />
              Панель администратора
            </MenuItem>
          )}
          <MenuItem
            className='profile-menu__item'
            onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/booking`)}
          >
            <StarBorderIcon />
            Мои Бронирования
          </MenuItem>
          <MenuItem
            className='profile-menu__item'
            onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/likes`)}
          >
            <FavoriteBorderIcon />
            Понравилось
          </MenuItem>
          <MenuItem
            className='profile-menu__item'
            onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/favorites`)}
          >
            <BookmarkBorderIcon />
            Избранное
          </MenuItem>
          <MenuItem className='profile-menu__item' onClick={handleLogOut}>
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
