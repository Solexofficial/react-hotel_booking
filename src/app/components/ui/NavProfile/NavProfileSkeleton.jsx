import { Skeleton } from '@mui/material';
import React from 'react';

const NavProfileSkeleton = () => {
  return (
    <>
      <div className='profile-wrapper'>
        <Skeleton variant='circular' width={56} height={46} animation='wave' />
      </div>
      <div className='profile-username__wrapper'>
        <Skeleton animation='wave' height={10} width={100} />
        <Skeleton animation='wave' height={10} width={100} />
      </div>
    </>
  );
};

export default NavProfileSkeleton;
