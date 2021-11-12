import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/common/footer/footer';
import DatePickerField from '../../components/common/form/datePickerField';
import GuestsDropDownField from '../../components/common/form/guestsDropDownField';
import Header from '../../components/common/header/header';
import Container from '../../components/common/container';
import RangeSliderField from '../../components/common/form/rangeSliderField';

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
      <Container>
        <h1>Rooms</h1>
        <div
          className='filters'
          style={{ width: '325px', borderRight: '1px solid #333', paddingTop: '30px', paddingRight: '50px' }}
        >
          <div className='filters-form'>
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
            <RangeSliderField />
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Rooms;
