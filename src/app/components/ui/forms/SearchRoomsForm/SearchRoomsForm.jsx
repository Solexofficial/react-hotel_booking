import { ArrowRight } from '@mui/icons-material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Form, useForm } from '../../../../hooks';
import Button from '../../../common/Button/Button';
import { DateOfStayField } from '../../../common/Fields';
import GuestsCounter from '../../GuestsCounter';
import validatorConfig from './validatorConfig';

const oneDayMs = 86000000;

const initialState = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 1,
  children: 0,
  babies: 0,
  rentPerDay: [0, 15000],
  canSmoke: false,
  canPets: false,
  canInvite: false,
  hasWideCorridor: false,
  hasDisabledAssistant: false,
  hasWifi: false,
  hasConditioner: false,
  hasWorkSpace: false,
};

const SearchRoomsForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { data, errors, handleInputChange, handleKeyDown, validate, handleResetForm } = useForm(
    initialState,
    true,
    validatorConfig
  );

  const handleSubmit = event => {
    event.preventDefault();
    if (validate(data)) {
      history.push(`/rooms`);
    }
  };

  const handleTestChange = ({ target }) => {
    handleInputChange({ target });
    dispatch({ type: 'filters/statusFilterChanged', payload: target });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      data={data}
      errors={errors}
      handleChange={handleTestChange}
      handleKeyDown={handleKeyDown}
    >
      <DateOfStayField name='dateOfStay' errors={errors} />
      <GuestsCounter name='guests' />
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
