import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import { DatePickerField, GuestsDropDownField, RangeSliderField } from '../../common/form/fields';
import queryString from 'query-string';

const initialData = {
  guests: [
    { name: 'adults', label: 'Взрослые', value: 0 },
    { name: 'children', label: 'Дети', value: 0 },
    { name: 'babies', label: 'Младенцы', value: 0 },
  ],
  arrival: new Date(Date.now()).getTime(),
  departure: new Date(Date.now()).getTime(),
  rentPerDay: [5000, 10000],
};

const RoomsFilter = () => {
  const [filterData, setFilterData] = useState(initialData || {});
  const history = useHistory();
  const querySearchStr = history.location.search;

  const handleChange = useCallback(({ target }) => {
    console.log('new VALUE: ', target);
    const { name, value } = target;
    setFilterData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const getQueryData = useCallback(async () => {
    let queryData = queryString.parse(querySearchStr);
    queryData = { ...queryData, guests: JSON.parse(queryData.guests) };
    return queryData;
  }, [querySearchStr]);

  useEffect(() => {
    if (querySearchStr) {
      try {
        getQueryData().then(data => setFilterData(prevState => ({ ...prevState, ...data })));
      } catch (error) {
        console.log(error);
      }
    }
  }, [querySearchStr, getQueryData]);

  return (
    <aside className='filters' style={{ width: '325px', paddingTop: '30px', paddingRight: '50px' }}>
      <div className='filters-form'>
        <DatePickerField
          label='Дата прибытия'
          minDate={Date.now()}
          name='arrival'
          clearable
          inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
          value={Number(filterData.arrival)}
          onChange={handleChange}
        />
        <DatePickerField
          label='Дата выезда'
          minDate={Date.now()}
          name='departure'
          inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
          value={Number(filterData.departure)}
          onChange={handleChange}
        />
        <GuestsDropDownField value={filterData.guests} setData={setFilterData} name='guests' />
        <RangeSliderField
          label='Диапазон цены'
          value={filterData.rentPerDay}
          name='rentPerDay'
          onChange={handleChange}
          min={0}
          max={15000}
        />
        <button onClick={() => console.log(filterData)}>Найти</button>
      </div>
    </aside>
  );
};

export default RoomsFilter;
