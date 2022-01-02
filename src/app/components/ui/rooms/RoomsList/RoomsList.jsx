import React from 'react';
import RoomCard from '../RoomCard';

const RoomsList = ({ rooms }) => {
  return (
    <ul className='rooms__list'>
      {rooms.map(room => (
        <li key={room._id} className='rooms__list-item'>
          <RoomCard {...room} />
        </li>
      ))}
    </ul>
  );
};

export default RoomsList;
