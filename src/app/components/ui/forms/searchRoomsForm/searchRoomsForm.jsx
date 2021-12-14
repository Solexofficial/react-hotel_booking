import { ArrowRight } from '@mui/icons-material';
import React from 'react';
import { useHistory } from 'react-router';
import { Form, useForm } from '../../../../hooks/useForm';
import sessionStorageService from '../../../../services/sessionStorage.service';
import DateOfStayField from '../../../common/form/dateOfStayField';
import GuestsDropDownField from '../../../common/form/guestsDropDownField';
import Button from '../../buttons/button';
import validatorConfig from './validatorConfig';

const oneDayMs = 86000000;

const initialData = {
  guests: [
    { name: 'adults', label: 'Взрослые', value: 0 },
    { name: 'children', label: 'Дети', value: 0 },
    { name: 'babies', label: 'Младенцы', value: 0 },
  ],
  dateOfStay: { arrival: new Date(Date.now()).getTime(), departure: new Date(Date.now()).getTime() + oneDayMs },
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
      history.push(`/rooms`);
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
      <DateOfStayField name='dateOfStay' />
      <GuestsDropDownField name='guests' setData={setData} data={data} />
      <Button variant='outlined' type='button' size='small' onClick={handleResetForm} className='form-btn__reset'>
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
