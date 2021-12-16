import { ArrowRight } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useAuth } from '../../../../hooks/useAuth';
import { Form, useForm } from '../../../../hooks/useForm';
import { useModal } from '../../../../hooks/useModal';
import roomsService from '../../../../services/rooms.service';
import sessionStorageService from '../../../../services/sessionStorage.service';
import Backdrop from '../../../common/backdrop';
import { DateOfStayField, GuestsDropDownField } from '../../../common/form/fields';
import Button from '../../buttons/button';
import SuccessBookingModal from '../../modals/successBookingModal';
import BookingFormPriceInfo from './bookingFormPriceInfo';
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
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { roomId } = useParams();
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { currentUser } = useAuth();

  const { data, setData, errors, handleInputChange, handleKeyDown, validate } = useForm(
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

  const setBooking = async (roomId, payload) => {
    try {
      setOpen(true);
      await roomsService.setBooking(roomId, payload);
      setOpen(false);
      handleOpenModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (validate(data)) {
      if (!currentUser) return history.push('../login/signIn');
      const payload = { userId: currentUser._id, ...data };
      setBooking(roomId, payload);
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
        <GuestsDropDownField name='guests' setData={setData} data={data} />
        <BookingFormPriceInfo name='price' rentPerDay={rentPerDay} countDays={countDays} />
        <Button
          endIcon={<ArrowRight />}
          type='submit'
          className='form-btn__submit mt-0'
          onClick={handleSubmit}
          disabled={Object.keys(errors).length > 0}
          fullWidth
        >
          Забронировать
        </Button>
      </Form>
      <SuccessBookingModal open={showModal} onClose={handleCloseModal} />
      <Backdrop open={open} />
    </>
  );
};

export default BookingForm;
