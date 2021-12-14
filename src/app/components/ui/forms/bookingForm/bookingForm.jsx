import { ArrowRight } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../../../hooks/useAuth';
import { Form, useForm } from '../../../../hooks/useForm';
import sessionStorageService from '../../../../services/sessionStorage.service';
import { DateOfStayField, GuestsDropDownField } from '../../../common/form/fields';
import Button from '../../buttons/button';
import BookingFormPriceInfo from './bookingFormPriceInfo';
import validatorConfig from './validatorConfig';

const oneDayMs = 86000000;

const initialData = {
  guests: [
    { name: 'adults', label: 'Взрослые', value: 0 },
    { name: 'children', label: 'Дети', value: 0 },
    { name: 'babies', label: 'Младенцы', value: 0 },
  ],
  dateOfStay: { arrival: new Date(Date.now()).getTime(), departure: new Date(Date.now()).getTime() + oneDayMs },
  totalCost: 0,
};

const BookingForm = ({ rentPerDay }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();

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
        totalCost: totalPrice,
      }));
    }
  }, []);

  // !FIX countDays bug when change input value
  const countDays = Math.max(1, Math.round((data.dateOfStay.departure - data.dateOfStay.arrival) / oneDayMs));

  const handleTotalPriceChange = value => {
    setTotalPrice(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (validate(data)) {
      if (!currentUser) return history.push('../login/signIn');
      console.log({
        [currentUser._id]: {
          ...data,
          totalCost: totalPrice,
        },
      });
      console.log('data booking room', data);
      console.log(history);
    }
  };
  return (
    <Form
      onSubmit={handleSubmit}
      data={data}
      errors={errors}
      handleChange={handleInputChange}
      handleKeyDown={handleKeyDown}
    >
      <DateOfStayField name='dateOfStay' className='booking-form' />
      <GuestsDropDownField name='guests' setData={setData} data={data} />
      <BookingFormPriceInfo
        name='price'
        rentPerDay={rentPerDay}
        countDays={countDays}
        onPriceChange={handleTotalPriceChange}
        totalPrice={totalPrice}
      />
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
  );
};

export default BookingForm;
