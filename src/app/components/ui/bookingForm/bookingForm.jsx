import { ArrowRight } from '@mui/icons-material';
import { Paper } from '@mui/material';
import queryString from 'query-string';
import React from 'react';
import { useHistory } from 'react-router';
import { Form, useForm } from '../../../hooks/useForm';
import DateOfStayField from '../../common/form/dateOfStayField';
import GuestsDropDownField from '../../common/form/guestsDropDownField';
import Loader from '../../common/loader';
import Tooltip from '../../common/tooltip';
import Button from '../buttons/button';
import useStyles from './styles';
import validatorConfig from './validatorConfig';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
  const classes = useStyles();
  const history = useHistory();
  console.log(room);

  const { data, setData, errors, handleInputChange, handleKeyDown, validate, handleResetForm } = useForm(
    initialData,
    true,
    validatorConfig
  );

  const countDays = Math.max(1, Math.round((data.dateOfStay.departure - data.dateOfStay.arrival) / oneDayMs));
  const discount = 2179;
  const tips = 300;

  const handleSubmit = event => {
    event.preventDefault();
    if (validate(data)) {
      console.log('data##########:', data);
      const queryStr = queryString.stringify({
        ...data,
        guests: JSON.stringify(data.guests),
        dateOfStay: JSON.stringify(data.dateOfStay),
      });
      console.log(history);
      // history.push(`/rooms/?${queryStr}`);
    }
  };
  if (room) {
    const { numberRoom, rentPerDay, type } = room;
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
                <span>{rentPerDay * countDays}&#8381;</span>
              </div>
            </div>
            <div className='booking-form__price-item'>
              <div className='price-item__with-tooltip'>
                <span>Сбор за услуги: скидка {discount}&#8381;</span>
                <Tooltip title='Скидка на первую бронь'>
                  <InfoOutlinedIcon className='booking-form__tooltip-icon' />
                </Tooltip>
              </div>

              <span>-{discount}&#8381;</span>
            </div>
            <div className='booking-form__price-item'>
              <div className='price-item__with-tooltip'>
                <span>Сбор за доп. услуги</span>
                <Tooltip title='Чаевые для персонала уже включены в счет'>
                  <InfoOutlinedIcon className='booking-form__tooltip-icon' />
                </Tooltip>
              </div>
              <span>{tips}&#8381;</span>
            </div>
            <div className='booking-form__price-item'>
              <div className='price-item__totalPrice'>
                <span className='totalPrice__text'>Итого</span>
                <span className='totalPrice__dots'></span>
                <span className='totalPrice__cell'>{rentPerDay * countDays}&#8381;</span>
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
