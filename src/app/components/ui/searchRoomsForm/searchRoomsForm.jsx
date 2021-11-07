import { ArrowRight } from '@mui/icons-material';
import { Paper } from '@mui/material';
import React from 'react';
import { Form, useForm } from '../../../hooks/useForm';
import declOfNum from '../../../utils/declOfNum';
import { DatePickerField, NumberField } from '../../common/form/fields';
import Title from '../../common/typography/title';
import Accordion from '../accordion';
import Button from '../buttons/button';
import useStyles from './styles';
import validatorConfig from './validatorConfig';

const initialData = {
  adults: 0,
  children: 0,
  babies: 0,
  arrival: new Date(Date.now()),
  departure: new Date(Date.now()),
};

const SearchRoomsForm = () => {
  const classes = useStyles();

  const { data, setData, errors, handleInputChange, handleKeyDown, validate, resetForm } = useForm(
    initialData,
    true,
    validatorConfig
  );

  const handleSubmit = e => {
    e.preventDefault();
    console.log(errors);
    console.log(validate(data));
    if (validate(data)) {
      console.log(data);
      resetForm();
    }
  };

  const getAccordionLabel = () => {
    const countGuests = data.adults + data.children + data.babies;
    const countBabies = data.babies;
    const guestsStr = `${countGuests} ${declOfNum(countGuests, ['гость', 'гостя', 'гостей'])}`;
    const babiesStr = `${countBabies} ${declOfNum(countBabies, ['младенец', 'младенца', 'младенцев'])}`;

    if (countGuests > 0 && countBabies > 0) {
      return `${guestsStr} ${babiesStr}`;
    }

    return countGuests > 0 ? guestsStr : 'Сколько гостей';
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Title isBold>Найдём номера под ваши пожелания</Title>
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
          minDate={Date.now()}
          name='departure'
          inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
        />
        <Accordion label={getAccordionLabel()} name='accordion'>
          <NumberField label='Взрослые' name='adults' value={data.adults} setData={setData} />
          <NumberField label='Дети' name='children' value={data.children} setData={setData} />
          <NumberField label='Младенцы' name='babies' value={data.babies} setData={setData} />
        </Accordion>
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
