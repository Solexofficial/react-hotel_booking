import { IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAuth } from '../../../hooks/useAuth';

const LikeButton = ({ likes, onToggle }) => {
  const [status, setStatus] = useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setStatus(likes.some(el => el.userId === currentUser?.id));
    }
  }, [likes, currentUser]);

  return (
    <IconButton
      aria-label='like'
      onClick={onToggle}
      className={status ? 'like-button like-button--active' : 'like-button'}
      disableRipple
      disabled={!currentUser}
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
