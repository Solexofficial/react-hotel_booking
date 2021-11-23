import React from 'react';
import RoomCard from './roomCard';

const RoomsList = ({ rooms }) => {
  console.log('rooms list render');
  return rooms.length > 0 ? (
    <ul className='rooms__list'>
      {rooms.map(room => (
        <li key={room.id} className='rooms__list-item'>
          <RoomCard {...room} />
        </li>
      ))}
    </ul>
  ) : (
    <h2>Мы не нашли для вас подходящих номеров по вашим параметрам &#128577;</h2>
  );
};

export default RoomsList;
