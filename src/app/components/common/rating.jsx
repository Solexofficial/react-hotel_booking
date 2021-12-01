import { Rating as MuiRating } from '@mui/material';
import React from 'react';

const Rating = ({ onChange, name, value, totalCount, ...rest }) => {
  const getRating = value => +Math.ceil(value / totalCount).toFixed();

  return <MuiRating name={name} value={getRating(value)} {...rest} />;
};

export default Rating;
