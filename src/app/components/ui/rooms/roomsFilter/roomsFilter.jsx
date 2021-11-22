import queryString from 'query-string';
import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useForm } from '../../../../hooks/useForm';
import {
  Checkbox,
  CheckBoxList,
  DateOfStayField,
  GuestsDropDownField,
  RangeSliderField,
} from '../../../common/form/fields';
import RoomsFilterList from './roomsFiltersList';

const initialData = {
  guests: [
    { name: 'adults', label: 'Взрослые', value: 0 },
    { name: 'children', label: 'Дети', value: 0 },
    { name: 'babies', label: 'Младенцы', value: 0 },
  ],
  dateOfStay: { arrival: new Date(Date.now()).getTime(), departure: new Date(Date.now()).getTime() },
  rentPerDay: [5000, 10000],
  canSmoke: false,
  canPets: false,
  canInvite: false,
  hasWideCorridor: false,
  hasDisabledAssistant: false,
};

const RoomsFilter = () => {
  const history = useHistory();
  const querySearchStr = history.location.search;

  const { data, setData, handleInputChange, handleResetForm } = useForm(initialData, false, {});

  const handleSubmit = e => {
    e.preventDefault();
    console.log(data);
  };

  const getQueryData = useCallback(async () => {
    let queryData = queryString.parse(querySearchStr);
    queryData = { ...queryData, guests: JSON.parse(queryData.guests), dateOfStay: JSON.parse(queryData.dateOfStay) };
    return queryData;
  }, [querySearchStr]);

  useEffect(() => {
    if (querySearchStr) {
      try {
        getQueryData().then(data => setData(prevState => ({ ...prevState, ...data })));
      } catch (error) {
        console.log(error);
      }
    }
  }, [querySearchStr, getQueryData, setData]);

  return (
    <section className='filters__wrapper'>
      <h2 className='visually-hidden'>Поиск отелей</h2>
      <RoomsFilterList data={data} handleChange={handleInputChange}>
        <DateOfStayField title='Дата пребывания в отеле' name='dateOfStay' />
        <GuestsDropDownField title='гости' setData={setData} name='guests' />
        <RangeSliderField
          label='Диапазон цены'
          description='Стоимость за сутки пребывания в номере'
          name='rentPerDay'
          min={0}
          max={15000}
        />
        <CheckBoxList title='Условия размещения' data={data}>
          <Checkbox label='Можно курить' name='canSmoke' />
          <Checkbox label='Можно c питомцами' name='canPets' />
          <Checkbox label='Можно пригласить гостей (до 10 человек)' name='canInvite' />
        </CheckBoxList>
        <CheckBoxList title='Доступность' data={data}>
          <Checkbox
            label='Широкий коридор'
            name='hasWideCorridor'
            labelDetails='Ширина коридоров в номере не менее 91см'
          />
          <Checkbox
            label='Помощник для инвалидов'
            name='hasDisabledAssistant'
            labelDetails='На 1 этаже вас встретит специалист и проводит до номера'
          />
        </CheckBoxList>
      </RoomsFilterList>
      <button onClick={handleSubmit}>Найти</button>
      <button onClick={handleResetForm}>Сбросить</button>
    </section>
  );
};

export default RoomsFilter;
