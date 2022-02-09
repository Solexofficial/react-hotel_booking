import { Rating as MuiRating, RatingProps as MuiRatingProps } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

type RatingProps = MuiRatingProps & {
  totalCount?: number;
};

const Rating: React.FC<RatingProps> = ({ onChange, name, value, totalCount = 1, ...rest }) => {
  const getRating = useCallback(value => +Math.ceil(value / totalCount).toFixed(), [totalCount]);

  const ratingValue = useMemo(() => getRating(value), [getRating, value]);

  return <MuiRating name={name} value={ratingValue} className='rating-wrapper' onChange={onChange} {...rest} />;
};

export default Rating;
