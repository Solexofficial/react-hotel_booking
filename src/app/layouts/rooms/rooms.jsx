import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/common/footer/footer';
import DatePickerField from '../../components/common/form/datePickerField';
import GuestsDropDownField from '../../components/common/form/guestsDropDownField';
import Header from '../../components/common/header/header';

const Rooms = () => {
  const [filterData, setFilterData] = useState({});

  useEffect(() => {
    let queryData = queryString.parse(window.location.search);
    queryData = { ...queryData, guests: JSON.parse(queryData.guests) };
    setFilterData(queryData);
  }, []);

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
        value={Number(filterData.arrival)}
      />
      <DatePickerField
        label='Дата выезда'
        minDate={Date.now()}
        name='departure'
        inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
        value={Number(filterData.departure)}
      />
      <GuestsDropDownField value={filterData.guests} setData={setFilterData} name='guests' />
      <Footer />
    </>
  );
};

export default Rooms;
