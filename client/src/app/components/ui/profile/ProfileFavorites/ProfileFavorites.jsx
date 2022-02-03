import React from 'react';
import localStorageService from '../../../../services/localStorage.service';
import { getRoomsByIds } from '../../../../store/rooms';
import { useSelector } from 'react-redux';
import RoomsList from '../../rooms/RoomsList/RoomsList';

const ProfileFavorites = () => {
  const favoritesRoomIds = JSON.parse(localStorageService.getFavoritesRoom());
  const rooms = useSelector(getRoomsByIds(favoritesRoomIds));
  console.log(rooms);
  console.log(favoritesRoomIds);
  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ marginBottom: '20px' }}>Мои любимые номера</h1>
      <RoomsList rooms={rooms} />
    </div>
  );
};

export default ProfileFavorites;
