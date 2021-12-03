import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LikeButton = ({ review }) => {
  const [status, setStatus] = useState(false);
  const [count, setCount] = useState(review.likes.length);

  const toggleFavorite = e => {
    console.log(e.target);
    setStatus(prevState => !prevState);
    status ? setCount(prevState => prevState - 1) : setCount(prevState => prevState + 1);
  };

  return (
    <IconButton
      aria-label='like'
      onClick={toggleFavorite}
      className={status ? 'like-button like-button--active' : 'like-button'}
      disableRipple
    >
      <div className='like-button__wrapper'>
        <span className='visually-hidden'>Количество лайков:</span>
        {status ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        {count}
      </div>
    </IconButton>
  );
};

export default LikeButton;
