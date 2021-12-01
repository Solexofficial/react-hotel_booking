import { Rating as MuiRating } from '@mui/material';
import React from 'react';

const Rating = ({ onChange, name, label, value, totalCount = 1, ...rest }) => {
  const getRating = value => +Math.ceil(value / totalCount).toFixed();

  return label ? (
    <div className='rating-wrapper' role='group'>
      <legend className='rating-label'>{label}</legend>
      <MuiRating name={name} value={getRating(value)} {...rest} onChange={onChange} />
    </div>
  ) : (
    <MuiRating name={name} value={getRating(value)} {...rest} onChange={onChange} />
  );
};

export default Rating;
