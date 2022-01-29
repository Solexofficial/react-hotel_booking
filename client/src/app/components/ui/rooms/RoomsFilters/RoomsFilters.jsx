import React, { useEffect, useState } from 'react';
import { useFiltersQuery } from '../../../../hooks';
import Button from '../../../common/Button';
import { Checkbox, CheckBoxList, DateOfStayField, RangeSliderField } from '../../../common/Fields';
import GuestsCounter from '../../GuestsCounter/GuestsCounter';
import RoomsFilterList from './RoomsFiltersList/RoomsFiltersList';

const oneDayMs = 86000000;

const initialState = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 0,
  children: 0,
  babies: 0,
  rentPerDay: [0, 15000],
  canSmoke: false,
  canPets: false,
  canInvite: false,
  hasWideCorridor: false,
  hasDisabledAssistant: false,
  hasWifi: false,
  hasConditioner: false,
  hasWorkSpace: false,
};

const RoomsFilter = ({ data, errors, handleResetForm, handleInputChange }) => {
  const [filters, setFilters] = useState(initialState);
  const [searchFilters, handleChangeFilter, onResetFilters] = useFiltersQuery();

  const handleResetFilters = e => {
    e.preventDefault();
    setFilters(initialState);
    onResetFilters();
  };

  useEffect(() => {
    if (Object.keys(searchFilters).length === 0) {
      setFilters(initialState);
    }
    setFilters({ ...initialState, ...searchFilters });
  }, [searchFilters]);

  return (
    <section className='filters__wrapper'>
      <h2 className='visually-hidden'>Поиск номеров в отеле toxin</h2>
      <RoomsFilterList data={filters} handleChange={handleChangeFilter}>
        <DateOfStayField title='Дата пребывания в отеле' name='dateOfStay' errors={errors} />
        <GuestsCounter />
        <RangeSliderField
          label='Диапазон цены'
          description='Стоимость за сутки пребывания в номере'
          name='rentPerDay'
          min={0}
          max={15000}
        />
        <CheckBoxList title='Удобства'>
          <Checkbox label='Wi-Fi' name='hasWifi' />
          <Checkbox label='Кондиционер' name='hasConditioner' />
          <Checkbox label='Рабочее место' name='hasWorkSpace' />
        </CheckBoxList>
        <CheckBoxList title='Условия размещения'>
          <Checkbox label='Можно c питомцами' name='canPets' />
          <Checkbox label='Можно курить' name='canSmoke' />
          <Checkbox label='Можно пригласить гостей (до 10 человек)' name='canInvite' />
        </CheckBoxList>
        <CheckBoxList title='Доступность'>
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
        <Button type='button' onClick={handleResetFilters} fullWidth>
          Сбросить Фильтры
        </Button>
      </RoomsFilterList>
    </section>
  );
};

export default RoomsFilter;
