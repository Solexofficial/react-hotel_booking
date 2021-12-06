import { ArrowRight } from '@mui/icons-material';
import { Paper } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router';
import { Form, useForm } from '../../../../hooks/useForm';
import sessionStorageService from '../../../../services/sessionStorage.service';
import DateOfStayField from '../../../common/form/dateOfStayField';
import GuestsDropDownField from '../../../common/form/guestsDropDownField';
import Title from '../../../common/typography/title';
import Button from '../../buttons/button';
import useStyles from './styles';
import validatorConfig from './validatorConfig';
import { useAuth } from '../../../../hooks/useAuth';

const initialData = {
  guests: [
    { name: 'adults', label: 'Взрослые', value: 0 },
    { name: 'children', label: 'Дети', value: 0 },
    { name: 'babies', label: 'Младенцы', value: 0 },
  ],
  dateOfStay: { arrival: new Date(Date.now()).getTime(), departure: new Date(Date.now()).getTime() },
};

const SearchRoomsForm = () => {
  const classes = useStyles();
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
        <DateOfStayField name='dateOfStay' />
        <GuestsDropDownField name='guests' setData={setData} data={data} />
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
          Подобрать номер
        </Button>
      </Form>
    </Paper>
  );
};

export default SearchRoomsForm;
