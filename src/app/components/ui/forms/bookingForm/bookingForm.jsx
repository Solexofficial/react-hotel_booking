import { ArrowRight } from '@mui/icons-material';
import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Form, useForm } from '../../../../hooks/useForm';
import DateOfStayField from '../../../common/form/dateOfStayField';
import GuestsDropDownField from '../../../common/form/guestsDropDownField';
import Loader from '../../../common/loader';
import Tooltip from '../../../common/tooltip';
import Button from '../../buttons/button';
import useStyles from './styles';
import validatorConfig from './validatorConfig';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import sessionStorageService from '../../../../services/sessionStorage.service';
import { getCurrentUser } from '../../../../services/localStorage.service';
import { useAuth } from '../../../../hooks/useAuth';

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

const BookingForm = ({ room }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const classes = useStyles();
  const history = useHistory();

  const { currentUser } = useAuth();

  const { data, setData, errors, handleInputChange, handleKeyDown, validate, handleResetForm } = useForm(
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

  const countDays = Math.max(1, Math.round((data.dateOfStay.departure - data.dateOfStay.arrival) / oneDayMs));

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
  if (room) {
    const { numberRoom, rentPerDay, type } = room;
    const DISCOUNT_PERCENT = 10;
    const PRICE_RENT = rentPerDay * countDays;
    const PRICE_RENT_WITH_DISCOUNT = (rentPerDay * countDays * DISCOUNT_PERCENT) / 100;
    const PRICE_SERVICE = 300;
    const TOTAL_PRICE = PRICE_RENT - PRICE_RENT_WITH_DISCOUNT + PRICE_SERVICE;
    return (
      <Paper elevation={3} className={classes.root}>
        <div className='booking-form__header'>
          <div className='booking-form__numberRoom'>
            <span className='booking-form__numberRoom-text'>№ {numberRoom}</span>
            {type && <span className='booking-form__numberRoom-type'>{type}</span>}
          </div>
          <div className='booking-form__cost'>
            <span>{rentPerDay}&#8381;</span> в сутки
          </div>
        </div>
        <Form
          onSubmit={handleSubmit}
          data={data}
          errors={errors}
          handleChange={handleInputChange}
          handleKeyDown={handleKeyDown}
        >
          <DateOfStayField name='dateOfStay' className='booking-form' />
          <GuestsDropDownField name='guests' setData={setData} data={data} />
          <div className='booking-form__price'>
            <div className='booking-form__price-item'>
              <div className='price-item__result'>
                <span>{`${rentPerDay}₽ x ${countDays} суток`}</span>
                <span>{PRICE_RENT}&#8381;</span>
              </div>
            </div>
            <div className='booking-form__price-item'>
              <div className='price-item__with-tooltip'>
                <span>Сбор за услуги: скидка {DISCOUNT_PERCENT}%</span>
                <Tooltip title='Скидка на первую бронь'>
                  <InfoOutlinedIcon className='booking-form__tooltip-icon' />
                </Tooltip>
              </div>

              <span>-{PRICE_RENT_WITH_DISCOUNT}&#8381;</span>
            </div>
            <div className='booking-form__price-item'>
              <div className='price-item__with-tooltip'>
                <span>Сбор за доп. услуги</span>
                <Tooltip title='Чаевые для персонала уже включены в счет'>
                  <InfoOutlinedIcon className='booking-form__tooltip-icon' />
                </Tooltip>
              </div>
              <span>{PRICE_SERVICE}&#8381;</span>
            </div>
            <div className='booking-form__price-item'>
              <div className='price-item__totalPrice'>
                <span className='totalPrice__text'>Итого</span>
                <span className='totalPrice__dots'></span>
                <span className='totalPrice__cell'>{TOTAL_PRICE}&#8381;</span>
              </div>
            </div>
          </div>

          <Button variant='outlined' type='button' size='small' onClick={handleResetForm} className={classes.btnReset}>
            Очистить
          </Button>
          <Button
            endIcon={<ArrowRight />}
            type='submit'
            className={classes.btnSubmit}
            onClick={handleSubmit}
            disabled={Object.keys(errors).length > 0}
            fullWidth
          >
            Забронировать
          </Button>
        </Form>
      </Paper>
    );
  }
  return <Loader />;
};

export default BookingForm;
