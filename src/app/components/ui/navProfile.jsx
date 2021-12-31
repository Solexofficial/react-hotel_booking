import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import Avatar from '../common/Avatar/Avatar';
import Tooltip from '../common/Tooltip/Tooltip';
import { useHistory } from 'react-router';
import { userProfileRoutes } from '../../router/routes';

const NavProfile = ({ user, onLogout }) => {
  const history = useHistory();

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
          {userProfileRoutes.map(setting => (
            <MenuItem
              key={setting.path}
              name={setting.name}
              onClick={() => handleClickSettingsMenu(setting.path)}
              className='profile-menu__item'
            >
              {setting?.icon}
              {setting.name}
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

export default NavProfile;
