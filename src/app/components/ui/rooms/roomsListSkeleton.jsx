import React from 'react';
import RoomCardSkeleton from './roomCardSkeleton';

const RoomsListSkeleton = ({ pageSize }) => {
  const roomsSkeletonArray = Array(pageSize).fill('');
  return (
    <ul className='rooms__list'>
      {roomsSkeletonArray.map((_, idx) => (
        <li key={idx} className='rooms__list-item'>
          <RoomCardSkeleton />
        </li>
      ))}
    </ul>
  );
};

export default RoomsListSkeleton;
