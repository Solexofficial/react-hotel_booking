import { Rating as MuiRating } from '@mui/material';
import React from 'react';

const Rating = ({ onChange, name, value, ...rest }) => {
  return <MuiRating name={name} value={value} {...rest} />;
};

export default Rating;
