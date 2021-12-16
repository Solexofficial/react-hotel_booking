import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DialogContent } from '@mui/material';
import React from 'react';
import Modal from '../../common/modal';

const SuccessBookingModal = ({ open, onClose, bookingData }) => {
  return (
    <Modal title='Бронирование номера' open={open} onClose={onClose}>
      <DialogContent>
        Успешное бронирование номера
        <CheckCircleIcon sx={{ width: '120px', height: '120px', fill: 'green' }} />
      </DialogContent>
    </Modal>
  );
};

export default SuccessBookingModal;
