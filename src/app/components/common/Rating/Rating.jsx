import { Rating as MuiRating } from '@mui/material';
import React from 'react';

const Rating = ({ onChange, name, label, value, totalCount = 1, ...rest }) => {
  const getRating = value => +Math.ceil(value / totalCount).toFixed();

  return <MuiRating name={name} value={getRating(value)} className='rating-wrapper' onChange={onChange} {...rest} />;
};

export default Rating;
