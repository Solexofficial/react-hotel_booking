import { ArrowRight } from '@mui/icons-material';
import React from 'react';
import { useHistory } from 'react-router';
import { Form, useForm } from '../../../../hooks';
import sessionStorageService from '../../../../services/sessionStorage.service';
import declOfNum from '../../../../utils/declOfNum';
import Counter from '../../../common/Counter';
import { DateOfStayField } from '../../../common/Fields';
import Button from '../../buttons/button';
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
  adults: 0,
  children: 0,
  babies: 0,
};

const SearchRoomsForm = () => {
  const history = useHistory();

  const { data, setData, errors, handleInputChange, handleKeyDown, validate, handleResetForm } = useForm(
    initialData,
    true,
    validatorConfig
  );

  const handleSubmit = event => {
    event.preventDefault();
    if (validate(data)) {
      console.log('data##########:', data);
      const { guests, dateOfStay } = data;
      sessionStorageService.setSessionStorageData(dateOfStay, guests);
      // history.push(`/rooms`);
      console.log(history);
    }
  };

  const getGuestsLabel = () => {
    const guests = [data.adults, data.children, data.babies];
    const countGuests = guests.reduce((acc, cur) => acc + cur, 0);
    const countBabies = Number(data.babies);

    const guestsStr = `${countGuests} ${declOfNum(countGuests, ['гость', 'гостя', 'гостей'])}`;
    const babiesStr = `${countBabies} ${declOfNum(countBabies, ['младенец', 'младенца', 'младенцев'])}`;

    if (countGuests > 0 && countBabies > 0) {
      return `${guestsStr} ${babiesStr}`;
    }

    return countGuests > 0 ? guestsStr : 'Сколько гостей';
  };

  return (
    <Form
      onSubmit={handleSubmit}
      data={data}
      errors={errors}
      handleChange={handleInputChange}
      handleKeyDown={handleKeyDown}
    >
      <DateOfStayField name='dateOfStay' />
      <p className='search-form__guests-label'>{getGuestsLabel()}</p>
      <Counter name='adults' label='Взрослые' min={0} max={10} />
      <Counter name='children' label='Дети' min={0} max={10} />
      <Counter name='babies' label='Младенцы' min={0} max={10} />
      <Button
        variant='outlined'
        type='button'
        size='small'
        onClick={handleResetForm}
        className='form-btn__reset'
        fullWidth
      >
        Очистить
      </Button>
      <Button
        endIcon={<ArrowRight />}
        type='submit'
        className='form-btn__submit'
        onClick={handleSubmit}
        disabled={Object.keys(errors).length > 0}
        fullWidth
      >
        Подобрать номер
      </Button>
    </Form>
  );
};

export default SearchRoomsForm;
