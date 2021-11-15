import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Container from '../../components/common/container';
import Footer from '../../components/common/footer/footer';
import DatePickerField from '../../components/common/form/datePickerField';
import GuestsDropDownField from '../../components/common/form/guestsDropDownField';
import RangeSliderField from '../../components/common/form/rangeSliderField';
import Header from '../../components/common/header/header';
import RoomsList from '../../components/ui/rooms/roomsList';

const initialData = {
  guests: [
    { name: 'adults', label: 'Взрослые', value: 0 },
    { name: 'children', label: 'Дети', value: 0 },
    { name: 'babies', label: 'Младенцы', value: 0 },
  ],
  arrival: new Date(Date.now()).getTime(),
  departure: new Date(Date.now()).getTime(),
};

const Rooms = () => {
  const [filterData, setFilterData] = useState(initialData || {});
  const history = useHistory();
  const querySearchStr = history.location.search;

  const getQueryData = useCallback(async () => {
    let queryData = queryString.parse(querySearchStr);
    queryData = { ...queryData, guests: JSON.parse(queryData.guests) };
    return queryData;
  }, [querySearchStr]);

  useEffect(() => {
    if (querySearchStr) {
      try {
        getQueryData().then(data => setFilterData(data));
      } catch (error) {
        console.log(error);
      }
    }
  }, [querySearchStr, getQueryData]);

  return (
    <>
      <Header />
      <Container>
        <div className='rootWrapper' style={{ display: 'flex' }}>
          <aside className='filters' style={{ width: '25%', paddingTop: '30px', paddingRight: '50px' }}>
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
          </aside>
          <div className='mainContent' style={{ width: '75%' }}>
            <h2>Номера, которые мы для вас подобрали</h2>
            <RoomsList />
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Rooms;
