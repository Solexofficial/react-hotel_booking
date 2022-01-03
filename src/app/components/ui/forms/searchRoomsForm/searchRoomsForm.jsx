import { ArrowRight } from '@mui/icons-material';
import React from 'react';
import { useHistory } from 'react-router';
import { Form, useForm } from '../../../../hooks';
import Button from '../../../common/Button/Button';
import { DateOfStayField } from '../../../common/Fields';
import GuestsCounter from '../../GuestsCounter';
import validatorConfig from './validatorConfig';

const oneDayMs = 86000000;

const initialData = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 0,
  children: 0,
  babies: 0,
};

const SearchRoomsForm = () => {
  const history = useHistory();

  const { data, errors, handleInputChange, handleKeyDown, validate, handleResetForm } = useForm(
    initialData,
    true,
    validatorConfig
  );

  const handleSubmit = event => {
    event.preventDefault();
    if (validate(data)) {
      // history.push(`/rooms`);
      console.log(history);
      console.log(data);
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
      <DateOfStayField name='dateOfStay' data={data} />
      <GuestsCounter name='guests' data={data} />
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
