import React from 'react';
import { useParams } from 'react-router';
import RoomPage from '../../components/pages/roomPage';
import RoomsListPage from '../../components/pages/roomsListPage';

const Rooms = () => {
  const { id } = useParams();

  return <>{id ? <RoomPage roomId={id} /> : <RoomsListPage />}</>;
};

export default Rooms;
