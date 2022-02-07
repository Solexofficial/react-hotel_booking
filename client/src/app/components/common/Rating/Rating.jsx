import { Rating as MuiRating } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

const Rating = ({ onChange, name, label, value, totalCount = 1, ...rest }) => {
  const getRating = useCallback(value => +Math.ceil(value / totalCount).toFixed(), [totalCount]);

  const ratingValue = useMemo(() => getRating(value), [getRating, value]);

  return <MuiRating name={name} value={ratingValue} className='rating-wrapper' onChange={onChange} {...rest} />;
};

export default Rating;
