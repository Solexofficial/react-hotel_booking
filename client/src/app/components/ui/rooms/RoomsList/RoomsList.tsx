import React from 'react';
import RoomCard from '../RoomCard';
import { RoomType } from '../../../../types/types';

type RoomListProps = {
  rooms: RoomType[];
};

const RoomsList: React.FC<RoomListProps> = ({ rooms }) => {
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

export default React.memo(RoomsList);
