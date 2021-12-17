import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DialogContent } from '@mui/material';
import React from 'react';
import Modal from '../../common/modal';

const SuccessBookingModal = ({ open, onClose, isLoading }) => {
  return (
    <Modal title='Бронирование номера' open={open} onClose={onClose} isLoading={isLoading}>
      <DialogContent>
        Успешное бронирование номера
        <CheckCircleIcon sx={{ width: '120px', height: '120px', fill: 'green' }} />
      </DialogContent>
    </Modal>
  );
};

export default React.memo(SuccessBookingModal);
