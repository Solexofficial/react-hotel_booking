import { ArrowRight } from '@mui/icons-material';
import { Paper } from '@mui/material';
import queryString from 'query-string';
import React from 'react';
import { useHistory } from 'react-router';
import { Form, useForm } from '../../../hooks/useForm';
import { DatePickerField } from '../../common/form/fields';
import GuestsDropDownField from '../../common/form/guestsDropDownField';
import Title from '../../common/typography/title';
import Button from '../buttons/button';
import useStyles from './styles';
import validatorConfig from './validatorConfig';

const initialData = {
  guests: [
    { name: 'adults', label: 'Взрослые', value: 0 },
    { name: 'children', label: 'Дети', value: 0 },
    { name: 'babies', label: 'Младенцы', value: 0 },
  ],
  arrival: new Date(Date.now()).getTime(),
  departure: new Date(Date.now()).getTime(),
};

const SearchRoomsForm = () => {
  const classes = useStyles();
  const history = useHistory();

  const { data, setData, errors, handleInputChange, handleKeyDown, validate, resetForm } = useForm(
    initialData,
    true,
    validatorConfig
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (validate(data)) {
      console.log('data##########:', data);
      const queryStr = queryString.stringify({ ...data, guests: JSON.stringify(data.guests) });
      resetForm();
      history.push(`/rooms/?${queryStr}`);
    }
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Title isBold component='h2' variant='h5'>
        Найдём номера под ваши пожелания
      </Title>
      <Form
        onSubmit={handleSubmit}
        data={data}
        errors={errors}
        handleChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      >
        <DatePickerField
          label='Дата прибытия'
          minDate={Date.now()}
          name='arrival'
          clearable
          inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
        />
        <DatePickerField
          label='Дата выезда'
          minDate={new Date(data.arrival)}
          name='departure'
          inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
        />
        <GuestsDropDownField name='guests' setData={setData} data={data} />
        <Button variant='outlined' type='button' size='small' onClick={resetForm} className={classes.btnReset}>
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
          Подобрать номер
        </Button>
      </Form>
    </Paper>
  );
};

export default SearchRoomsForm;
