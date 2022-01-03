import { ArrowRight } from '@mui/icons-material';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Form, useAuth, useFetching, useForm, useModal } from '../../../../hooks';
import bookingService from '../../../../services/booking.service';
import roomsService from '../../../../services/rooms.service';
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
  adults: 0,
  children: 0,
  babies: 0,
  totalPrice: 0,
};

const BookingForm = ({ rentPerDay }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();
  const { roomId } = useParams();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const { currentUser } = useAuth();

  const { data, errors, enterError, setEnterError, handleInputChange, handleKeyDown, validate } = useForm(
    initialData,
    true,
    validatorConfig
  );

  const countDays = Math.max(1, Math.round((data.departureDate - data.arrivalDate) / oneDayMs));

  const [setBooking] = useFetching(async roomId => {
    await roomsService.setBooking(roomId, { isBooked: [data.arrivalDate, data.departureDate] });
    setEnterError('Вы забронировали этот номер');
  });

  const [createBooking, isCreateBookingLoading] = useFetching(async payload => {
    await bookingService.create(payload);
    handleOpenModal();
  });

  const handleSubmit = event => {
    event.preventDefault();
    if (validate(data)) {
      if (!currentUser) return history.push('../login/signIn');
      const payload = {
        _id: Math.random().toString(36).substring(2, 9),
        userId: currentUser._id,
        roomId: roomId,
        ...data,
        totalPrice,
      };
      setBooking(roomId);
      createBooking(payload);
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
          totalPrice={totalPrice}
          rentPerDay={rentPerDay}
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
        isLoading={isCreateBookingLoading}
        bookingData={data}
      />
    </>
  );
};

export default BookingForm;
