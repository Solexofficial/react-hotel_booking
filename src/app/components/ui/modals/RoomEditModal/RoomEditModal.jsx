import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DialogContent, DialogActions } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useFetching } from '../../../../hooks';
import roomsService from '../../../../services/rooms.service';
import Button from '../../../common/Button';
import Modal from '../../../common/Modal';

const RoomEditModal = ({ open, onClose, roomId }) => {
  const [room, setRoom] = useState();
  const history = useHistory();

  const [getRoom, roomIsLoading] = useFetching(async roomId => {
    const { content } = await roomsService.getById(roomId);
    setRoom(content);
  });

  useEffect(() => {
    getRoom();
  }, []);

  if (!roomIsLoading) {
    console.log(room);
  }

  const handleGoBack = () => {
    history.goBack();
  };

  const handleGoMyBooking = () => {
    history.push('/profile/booking');
  };

  return (
    <Modal title='Редактировать номер' open={open} onClose={onClose} isLoading={roomIsLoading}>
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
