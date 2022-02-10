import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DialogContent, DialogActions } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getDateDDMMYYYY } from '../../../../utils/formatDate';
import Button from '../../../common/Button';
import Modal from '../../../common/Modal';
import { getCurrentUserId } from '../../../../store/users';
import history from '../../../../utils/history';
import { BookingType } from '../../../../types/types';

type SuccessBookingModalProps = {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  bookingData: BookingType;
};

const SuccessBookingModal: React.FC<SuccessBookingModalProps> = ({ open, onClose, isLoading, bookingData }) => {
  const currentUserId = useSelector(getCurrentUserId());
  const dateArrival = getDateDDMMYYYY(bookingData.arrivalDate);
  const dateDeparture = getDateDDMMYYYY(bookingData.departureDate);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleGoMyBooking = () => {
    history.push(`/profile/${currentUserId}/booking`);
  };

  return (
    <Modal title='Бронирование номера' open={open} onClose={onClose} isLoading={isLoading}>
      <DialogContent>
        <div className='booking-modal__text'>
          <h2>Номер успешно забронирован</h2>
          <CheckCircleIcon className='booking-modal__text-icon' />
        </div>
        <table className='booking-modal__info'>
          <tbody>
            <tr>
              <td className='booking-modal__info-dateText'>Дата прибытия:</td>
              <td className='booking-modal__info-date'>{dateArrival}</td>
            </tr>
            <tr>
              <td className='booking-modal__info-dateText'>Дата выезда:</td>
              <td className='booking-modal__info-date'>{dateDeparture}</td>
            </tr>
          </tbody>
        </table>
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

export default React.memo(SuccessBookingModal);
