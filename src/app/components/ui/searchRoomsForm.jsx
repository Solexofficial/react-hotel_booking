import { ArrowRight } from '@mui/icons-material';
import { Button, Card, Typography } from '@mui/material';
import React, { useState } from 'react';
import declOfNum from '../../utils/declOfNum';
import DatePickerField from '../common/form/datePickerField';
import NumberField from '../common/form/numberField';
import Title from '../common/typography/title';
import MyAccordion from './accordion';

const initialState = { adults: 0, children: 0, babies: 0, arrival: null, departure: null };
const SearchRoomsForm = () => {
  const [data, setData] = useState(initialState);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(data);
  };

  const handleReset = () => {
    setData(initialState);
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
          name='arrival'
        />
        <DatePickerField
          label='Дата выезда'
          style={{ margin: '15px 0' }}
          value={data.departure}
          setData={setData}
          name='departure'
        />
        <Typography sx={{ marginTop: '20px', fontWeight: 700 }}>Гости</Typography>
        <MyAccordion label={getAccordionLabel()}>
          <NumberField label='Взрослые' name='adults' data={data} setData={setData} />
          <NumberField label='Дети' name='children' data={data} setData={setData} />
          <NumberField label='Младенцы' name='babies' data={data} setData={setData} />
        </MyAccordion>
        <Button variant='outlined' size='small' onClick={handleReset} sx={{ mt: '15px' }}>
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
