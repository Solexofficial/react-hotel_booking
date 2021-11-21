import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import CheckBoxList from '../../../common/form/checkBoxList';
import DateOfStayField from '../../../common/form/dateOfStayField';
import { DatePickerField, GuestsDropDownField, RangeSliderField } from '../../../common/form/fields';
import MyCheckBox from '../../../common/form/myCheckBox';
import Text from '../../../common/typography/text';
import RoomsFilterList from './roomsFiltersList';
import Button from '../../buttons/button';

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

  const handleSubmit = e => {
    e.preventDefault();
    console.log(filterData);
  };

  const getQueryData = useCallback(async () => {
    let queryData = queryString.parse(querySearchStr);
    queryData = { ...queryData, guests: JSON.parse(queryData.guests), dateOfStay: JSON.parse(queryData.dateOfStay) };
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
    <section className='filters__wrapper'>
      <h2 className='visually-hidden'>Поиск отелей</h2>
      <RoomsFilterList data={filterData} handleChange={handleChange}>
        <DateOfStayField title='Дата пребывания в отеле' name='dateOfStay' />
        <GuestsDropDownField title='гости' setData={setFilterData} name='guests' />
        <RangeSliderField
          label='Диапазон цены'
          description='Стоимость за сутки пребывания в номере'
          name='rentPerDay'
          min={0}
          max={15000}
        />
        <CheckBoxList title='Условия размещения'>
          <MyCheckBox label='Можно курить' name='canSmoke' />
          <MyCheckBox label='Можно c питомцами' name='canPets' />
          <MyCheckBox label='Можно пригласить гостей (до 10 человек)' name='canInvite' />
        </CheckBoxList>
        <CheckBoxList title='Доступность'>
          <MyCheckBox
            label='Широкий коридор'
            name='hasWideCorridor'
            labelDetails='Ширина коридоров в номере не менее 91см'
          />
          <MyCheckBox
            label='Помощник для инвалидов'
            name='hasDisabledAssistant'
            labelDetails='На 1 этаже вас встретит специалист и проводит до номера'
          />
        </CheckBoxList>
        <Button onClick={handleSubmit} size='small' type='submit'>
          Найти
        </Button>
      </RoomsFilterList>
    </section>
  );
};

export default RoomsFilter;
