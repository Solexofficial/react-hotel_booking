import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Divider from '../../common/divider';

const RoomCardSkeleton = () => {
  return (
    <div className='room-card__skeleton'>
      <Skeleton variant='rectangular' animation='wave' height={150} />
      <Skeleton variant='text' animation='wave' height={50} />
      <Divider />
      <Skeleton variant='text' animation='wave' height={50} />
    </div>
  );
};

export default RoomCardSkeleton;
