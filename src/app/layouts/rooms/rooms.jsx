import queryString from 'query-string';
import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../../components/common/footer/footer';
import DatePickerField from '../../components/common/form/datePickerField';
import GuestsDropDownField from '../../components/common/form/guestsDropDownField';
import NumberField from '../../components/common/form/numberField';
import Header from '../../components/common/header/header';
import Accordion from '../../components/ui/accordion';
import SearchRoomsForm from '../../components/ui/searchRoomsForm/searchRoomsForm';
import declOfNum from '../../utils/declOfNum';

const Rooms = () => {
  const history = useHistory();
  let data = queryString.parse(history.location.search);
  console.log('data query', { ...data, guests: JSON.parse(data.guests) });
  data = { ...data, guests: JSON.parse(data.guests) };

  const getAccordionLabel = () => {
    const countGuests = Number(data.adults) + Number(data.children) + Number(data.babies);
    const countBabies = data.babies;
    const guestsStr = `${countGuests} ${declOfNum(countGuests, ['гость', 'гостя', 'гостей'])}`;
    const babiesStr = `${countBabies} ${declOfNum(countBabies, ['младенец', 'младенца', 'младенцев'])}`;

    if (countGuests > 0 && countBabies > 0) {
      return `${guestsStr} ${babiesStr}`;
    }

    return countGuests > 0 ? guestsStr : 'Сколько гостей';
  };

  return (
    <>
      <Header />
      <h1>Rooms</h1>
      <DatePickerField
        label='Дата прибытия'
        minDate={Date.now()}
        name='arrival'
        clearable
        inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
        value={Number(data.arrival)}
      />
      <DatePickerField
        label='Дата выезда'
        minDate={Date.now()}
        name='departure'
        inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
        value={Number(data.departure)}
      />
      <GuestsDropDownField value={data.guests} name='guests' />
      <Footer />
    </>
  );
};

export default Rooms;
