import { ArrowRight } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Form, useForm, useModal } from '../../../../hooks';
import { getSearchQueryData } from '../../../../services/sessionStorage.service';
import { createBooking, getBookingCreatedStatus, getBookingsErrors } from '../../../../store/bookings';
import { addBookingRoom } from '../../../../store/rooms';
import { getCurrentUserId } from '../../../../store/users';
import Button from '../../../common/Button';
import { DateOfStayField } from '../../../common/Fields';
import GuestsCounter from '../../GuestsCounter';
import { SuccessBookingModal } from '../../modals';
import BookingFormPriceInfo from './BookingFormPriceInfo';
import validatorConfig from './validatorConfig';

const oneDayMs = 86_000_000;

const BookingForm = () => {
  console.log('booking form render');
  const searchQueryData = getSearchQueryData();
  const initialData = {
    arrivalDate: searchQueryData.arrivalDate || Date.now(),
    departureDate: searchQueryData.departureDate || Date.now() + oneDayMs,
    adults: searchQueryData.adults || 1,
    children: searchQueryData.children || 0,
    babies: searchQueryData.babies || 0,
    totalPrice: 0,
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());
  const bookingCreateStatusLoading = useSelector(getBookingCreatedStatus());
  const bookingError = useSelector(getBookingsErrors());
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const { data, errors, enterError, setEnterError, handleInputChange, handleResetForm, handleKeyDown, validate } =
    useForm(initialData, false, validatorConfig);

  const countDays = Math.max(1, Math.round((data.departureDate - data.arrivalDate) / oneDayMs));

  useEffect(() => {
    if (!currentUserId) {
      setEnterError('Войдите, чтобы забронировать номер');
    }
    if (bookingError) {
      if (bookingError === 'BOOKING_EXIST') {
        setEnterError('На выбранные вами даты номер забронирован ');
      }
    }
  }, [currentUserId, bookingError]);

  const handleSubmit = event => {
    event.preventDefault();
    if (validate(data)) {
      const payload = {
        roomId: roomId,
        ...data,
        totalPrice,
      };

      dispatch(createBooking(payload)).then(bookingData => {
        if (bookingData) {
          dispatch(addBookingRoom(bookingData)).then(() => handleOpenModal());
          handleResetForm(event);
        }
      });
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        data={data}
        errors={errors}
        handleChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      >
        <DateOfStayField name='dateOfStay' className='booking-form' data={data} />
        <GuestsCounter name='guests' data={data} />
        <BookingFormPriceInfo
          name='totalPrice'
          roomId={roomId}
          totalPrice={totalPrice}
          countDays={countDays}
          setTotalPrice={setTotalPrice}
        />
        <Button
          endIcon={<ArrowRight />}
          type='submit'
          className='form-btn__submit mt-0'
          onClick={handleSubmit}
          disabled={Object.keys(errors).length > 0 || !!enterError}
          fullWidth
        >
          Забронировать
        </Button>
      </Form>
      {enterError && <p className='form__enter-error'>{enterError}</p>}
      <SuccessBookingModal
        open={isOpen}
        onClose={handleCloseModal}
        isLoading={bookingCreateStatusLoading}
        bookingData={data}
      />
    </>
  );
};

export default BookingForm;
