import { FormControl } from '@material-ui/core';
import { ArrowRight } from '@mui/icons-material';
import { Card } from '@mui/material';
import React from 'react';
import { useForm } from '../../../hooks/useForm';
import declOfNum from '../../../utils/declOfNum';
import { DatePickerField, NumberField } from '../../common/form/fields';
import SmallTitle from '../../common/typography/smallTitle';
import Title from '../../common/typography/title';
import Accordion from '../accordion';
import Button from '../buttons/Button';
import useStyles from './styles';

const initialDate = { adults: 0, children: 0, babies: 0, arrival: null, departure: null };

const SearchRoomsForm = () => {
  const classes = useStyles();
  const validate = (fieldValues = data) => {
    let temp = { ...errors };
    if ('fullName' in fieldValues) temp.fullName = fieldValues.fullName ? '' : 'This field is required.';
    if ('email' in fieldValues) temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Email is not valid.';
    if ('mobile' in fieldValues) temp.mobile = fieldValues.mobile.length > 9 ? '' : 'Minimum 10 numbers required.';
    if ('departmentId' in fieldValues)
      temp.departmentId = fieldValues.departmentId.length !== 0 ? '' : 'This field is required.';
    setErrors({
      ...temp,
    });

    if (fieldValues === data) return Object.values(temp).every(x => x === '');
  };

  const { data, setData, errors, setErrors, handleInputChange, resetForm } = useForm(initialDate, true, validate);

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
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

    if (countGuests > 0) {
      return guestsStr;
    }
    return 'Сколько гостей';
  };

  return (
    <>
      <Card raised className={classes.root} component='form'>
        <FormControl fullWidth>
          <Title isBold>Найдём номера под ваши пожелания</Title>
          <DatePickerField
            label='Дата прибытия'
            value={data.arrival}
            onChange={handleInputChange}
            name='arrival'
            inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
          />
          <DatePickerField
            label='Дата выезда'
            value={data.departure}
            minDate={Date.now()}
            onChange={handleInputChange}
            name='departure'
            inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
          />
        </FormControl>
        <FormControl fullWidth>
          <SmallTitle isBold upperCase>
            Гости
          </SmallTitle>
          <Accordion label={getAccordionLabel()}>
            <NumberField label='Взрослые' name='adults' data={data} setData={setData} />
            <NumberField label='Дети' name='children' data={data} setData={setData} />
            <NumberField label='Младенцы' name='babies' data={data} setData={setData} />
          </Accordion>
        </FormControl>
        <Button variant='outlined' size='small' onClick={resetForm} className={classes.btnReset}>
          Очистить
        </Button>
        <Button
          variant='contained'
          size='large'
          color='primary'
          endIcon={<ArrowRight />}
          className={classes.btnSubmit}
          onClick={handleSubmit}
          fullWidth
        >
          Подобрать номер
        </Button>
      </Card>
    </>
  );
};

export default SearchRoomsForm;
