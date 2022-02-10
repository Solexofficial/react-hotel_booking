import { ArrowRight } from '@mui/icons-material';
import React from 'react';
import { Form, useForm } from '../../../../hooks';
import Button from '../../../common/Button/Button';
import { DateOfStayField } from '../../../common/Fields';
import GuestsCounter from '../../GuestsCounter';
import validatorConfig from './validatorConfig';
import queryString from 'query-string';
import { setSessionStorageData } from '../../../../services/sessionStorage.service';
import history from '../../../../utils/history';

const oneDayMs = 86000000;

const initialState = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 1,
  children: 0,
  babies: 0,
};

const SearchRoomsForm = () => {
  const { data, errors, handleInputChange, handleKeyDown, validate, handleResetForm } = useForm(
    initialState,
    true,
    validatorConfig
  );

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (validate(data)) {
      const queryParams = queryString.stringify(data);
      setSessionStorageData(queryParams);
      history.push(`/rooms?${queryParams}`);
    }
  };

  return (
    <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown}>
      <DateOfStayField data={data} onChange={handleInputChange} errors={errors} />
      <GuestsCounter data={data} onChange={handleInputChange} />
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
