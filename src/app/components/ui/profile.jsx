import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '../common/avatar';
import Tooltip from '../common/tooltip';

const Profile = ({ user, settingsRoutes = [], onLogout }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickSettingsMenu = event => {
    handleCloseUserMenu();
  };
  if (user) {
    const { avatarPhoto, firstName, secondName } = user;
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
          {settingsRoutes.map(setting => (
            <MenuItem
              key={setting.path}
              name={setting.name}
              onClick={handleClickSettingsMenu}
              className='profile-menu__item'
            >
              {setting?.icon}
              <NavLink to={setting.path}>{setting.name}</NavLink>
            </MenuItem>
          ))}
          <MenuItem className='profile-menu__item' name='logout' onClick={onLogout}>
            <ExitToAppIcon />
            Выйти
          </MenuItem>
        </Menu>
      </div>
    );
  }
};

export default Profile;
