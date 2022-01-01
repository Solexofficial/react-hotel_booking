import { ArrowRight } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useAuth, useFetching, useModal, useForm, Form } from '../../../../hooks';
import bookingService from '../../../../services/booking.service';
import roomsService from '../../../../services/rooms.service';
import sessionStorageService from '../../../../services/sessionStorage.service';
import { DateOfStayField, GuestsDropdownField } from '../../../common/Fields';
import Button from '../../buttons/button';
import SuccessBookingModal from '../../modals/successBookingModal';
import BookingFormPriceInfo from './BookingFormPriceInfo';
import validatorConfig from './validatorConfig';

const oneDayMs = 86000000;

const initialData = {
  guests: [
    { name: 'adults', label: 'Взрослые', value: 0 },
    { name: 'children', label: 'Дети', value: 0 },
    { name: 'babies', label: 'Младенцы', value: 0 },
  ],
  dateOfStay: {
    arrival: new Date(new Date().toISOString().slice(0, 10)).getTime(),
    departure: new Date(new Date().toISOString().slice(0, 10)).getTime() + oneDayMs,
  },
};

const BookingForm = ({ rentPerDay }) => {
  const history = useHistory();
  const { roomId } = useParams();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const { currentUser } = useAuth();

  const { data, setData, errors, enterError, setEnterError, handleInputChange, handleKeyDown, validate } = useForm(
    initialData,
    true,
    validatorConfig
  );

  useEffect(() => {
    const dateOfStay = sessionStorageService.getDateOfStayData();
    const guestsCount = sessionStorageService.getCountGuestsData();

    if (dateOfStay && guestsCount) {
      setData(prevState => ({
        ...prevState,
        dateOfStay: dateOfStay,
        guests: guestsCount,
      }));
    }
  }, [setData]);

  const countDays = Math.max(1, Math.round((data.dateOfStay.departure - data.dateOfStay.arrival) / oneDayMs));

  const [setBooking] = useFetching(async roomId => {
    await roomsService.setBooking(roomId, { isBooked: [data.dateOfStay.arrival, data.dateOfStay.departure] });
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
        <DateOfStayField name='dateOfStay' className='booking-form' />
        <GuestsDropdownField name='guests' setData={setData} data={data} />
        <BookingFormPriceInfo name='price' rentPerDay={rentPerDay} countDays={countDays} />
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
