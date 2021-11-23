import React from 'react';
import RoomCard from './roomCard';

const RoomsList = ({ rooms }) => {
  console.log('rooms list render');
  return (
    <ul className='rooms__list'>
      {rooms.map(room => (
        <li key={room.id} className='rooms__list-item'>
          <RoomCard {...room} />
        </li>
      ))}
    </ul>
  );
};

export default RoomsList;
