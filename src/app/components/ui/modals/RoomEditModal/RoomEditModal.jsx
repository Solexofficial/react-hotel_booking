import { DialogActions, DialogContent } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getRoomById } from '../../../../store/rooms';
import Button from '../../../common/Button';
import Modal from '../../../common/Modal';

const RoomEditModal = ({ open, onClose, roomId }) => {
  const currentRoom = useSelector(getRoomById(roomId));
  const history = useHistory();
  console.log(currentRoom);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleGoMyBooking = () => {
    history.push('/profile/booking');
  };

  return (
    <Modal title='Редактировать номер' open={open} onClose={onClose}>
      <DialogContent>
        <h2>Редактировать номер</h2>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleGoBack}>Назад</Button>
        <Button onClick={handleGoMyBooking} variant='outlined'>
          Мои бронирования
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default React.memo(RoomEditModal);
