import { ArrowRight } from '@mui/icons-material';
import { Button, Card, Typography } from '@mui/material';
import React from 'react';
import { useForm } from '../../hooks/useForm';
import declOfNum from '../../utils/declOfNum';
import DatePickerField from '../common/form/datePickerField';
import NumberField from '../common/form/numberField';
import Title from '../common/typography/title';
import MyAccordion from './accordion';

const initialDate = { adults: 0, children: 0, babies: 0, arrival: null, departure: null };
const SearchRoomsForm = () => {
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
      <Card
        raised
        sx={{ mt: '70px', padding: '30px', paddingTop: '40px', background: '#fff', width: 380 }}
        component='form'
      >
        <Title isBold>Найдём номера под ваши пожелания</Title>
        <DatePickerField
          label='Дата прибытия'
          style={{ margin: '15px 0' }}
          value={data.arrival}
          setData={setData}
          onChange={handleInputChange}
          name='arrival'
          inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
        />
        <DatePickerField
          label='Дата выезда'
          style={{ margin: '15px 0' }}
          value={data.departure}
          setData={setData}
          onChange={handleInputChange}
          name='departure'
          inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
        />
        <Typography sx={{ marginTop: '20px', fontWeight: 700 }}>Гости</Typography>
        <MyAccordion label={getAccordionLabel()}>
          <NumberField label='Взрослые' name='adults' data={data} setData={setData} />
          <NumberField label='Дети' name='children' data={data} setData={setData} />
          <NumberField label='Младенцы' name='babies' data={data} setData={setData} />
        </MyAccordion>
        <Button variant='outlined' size='small' onClick={resetForm} sx={{ mt: '15px' }}>
          Очистить
        </Button>
        <Button
          variant='contained'
          size='large'
          color='primary'
          endIcon={<ArrowRight />}
          sx={{ mt: '30px' }}
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
