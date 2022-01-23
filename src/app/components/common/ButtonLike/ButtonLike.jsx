import { IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';
import { getCurrentUserId, getIsLoggedIn } from '../../../store/users';

const ButtonLike = ({ likes, onToggle }) => {
  console.log(likes);
  const [status, setStatus] = useState(false);
  const isLoggedIn = useSelector(getIsLoggedIn());
  const currentUserId = useSelector(getCurrentUserId());

  useEffect(() => {
    if (currentUserId) {
      setStatus(likes.some(el => el.userId === currentUserId));
    }
  }, [likes, currentUserId]);

  return (
    <IconButton
      aria-label='like'
      onClick={onToggle}
      className={status ? 'like-button like-button--active' : 'like-button'}
      disableRipple
      disabled={!isLoggedIn}
    >
      <div className='like-button__wrapper'>
        <span className='visually-hidden'>Количество лайков:</span>
        {status ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        {likes.length}
      </div>
    </IconButton>
  );
};

export default ButtonLike;
