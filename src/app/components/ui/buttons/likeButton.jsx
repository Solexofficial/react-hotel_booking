import { IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LikeButton = ({ likes, onToggle }) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    console.log(likes.some(el => el.userId === currentUser));
    setStatus(likes.some(el => el.userId === currentUser));
  }, [likes]);

  return (
    <IconButton
      aria-label='like'
      onClick={onToggle}
      className={status ? 'like-button like-button--active' : 'like-button'}
      disableRipple
    >
      <div className='like-button__wrapper'>
        <span className='visually-hidden'>Количество лайков:</span>
        {status ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        {likes.length}
      </div>
    </IconButton>
  );
};

export default LikeButton;
