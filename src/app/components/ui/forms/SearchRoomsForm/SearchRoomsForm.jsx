import { ArrowRight } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Form, useForm } from '../../../../hooks';
import { getFilters } from '../../../../store/filters';
import Button from '../../../common/Button/Button';
import { DateOfStayField } from '../../../common/Fields';
import GuestsCounter from '../../GuestsCounter';
import validatorConfig from './validatorConfig';

const SearchRoomsForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const filters = useSelector(getFilters());

  const { data, errors, handleInputChange, handleKeyDown, validate, handleResetForm } = useForm(
    filters,
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
