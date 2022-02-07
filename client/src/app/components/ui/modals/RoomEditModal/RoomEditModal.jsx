import { DialogContent } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getRoomById } from '../../../../store/rooms';
import Modal from '../../../common/Modal';
import { RoomEditForm } from '../../forms';

const RoomEditModal = ({ open, onClose, roomId }) => {
  const currentRoom = useSelector(getRoomById(roomId));
  console.log(currentRoom);

  const handleUpdateRoomData = payload => {
    console.log(payload);
  };

  return (
    <Modal title='Редактировать номер' open={open} onClose={onClose}>
      <DialogContent>
        <h2>Редактировать номер {currentRoom.roomNumber}</h2>
        <RoomEditForm roomData={currentRoom} />
      </DialogContent>
    </Modal>
  );
};

export default React.memo(RoomEditModal);
