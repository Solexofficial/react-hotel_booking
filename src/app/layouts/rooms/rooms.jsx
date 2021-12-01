import React from 'react';
import { useParams } from 'react-router';
import RoomPage from '../../components/pages/roomPage';
import RoomsListPage from '../../components/pages/roomsListPage';

const Rooms = () => {
  const { roomId } = useParams();

  return <>{roomId ? <RoomPage roomId={roomId} /> : <RoomsListPage />}</>;
};

export default Rooms;
