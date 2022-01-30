import { ArrowRight } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Form, useForm, useModal } from '../../../../hooks';
import { createBooking, getBookingCreatedStatus } from '../../../../store/bookings';
import { addBooking } from '../../../../store/rooms';
import { getCurrentUserId } from '../../../../store/users';
import Button from '../../../common/Button';
import { DateOfStayField } from '../../../common/Fields';
import GuestsCounter from '../../GuestsCounter';
import { SuccessBookingModal } from '../../modals';
import BookingFormPriceInfo from './BookingFormPriceInfo';
import validatorConfig from './validatorConfig';

const oneDayMs = 86000000;

const initialData = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 1,
  children: 0,
  babies: 0,
  totalPrice: 0,
};

const BookingForm = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());
  const bookingCreateStatusLoading = useSelector(getBookingCreatedStatus());
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const { data, setData, errors, enterError, setEnterError, handleInputChange, handleKeyDown, validate } = useForm(
    initialData,
    true,
    validatorConfig
  );

  const countDays = Math.max(1, Math.round((data.departureDate - data.arrivalDate) / oneDayMs));

  useEffect(() => {
    if (!currentUserId) {
      setEnterError('Войдите, чтобы забронировать номер');
    }
  }, [currentUserId]);

  const handleSubmit = event => {
    event.preventDefault();
    if (validate(data)) {
      const payload = {
        _id: Math.random().toString(36).substring(2, 9),
        userId: currentUserId,
        roomId: roomId,
        ...data,
        totalPrice,
      };
      dispatch(addBooking(roomId, payload))
        .then(dispatch(createBooking(payload)))
        .then(() => handleOpenModal());
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