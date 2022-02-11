import React, { useCallback } from 'react';
import { useFiltersQuery } from '../../../../hooks';
import Button from '../../../common/Button';
import { Checkbox, CheckBoxList, DateOfStayField, RangeSliderField } from '../../../common/Fields';
import GuestsCounter from '../../GuestsCounter/GuestsCounter';
import RoomsFilterList from './RoomsFiltersList/RoomsFiltersList';

const oneDayMs = 86000000;

const initialState = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 1,
  children: 0,
  babies: 0,
  price: [0, 15000],
  canSmoke: false,
  canPets: false,
  canInvite: false,
  hasWideCorridor: false,
  hasDisabledAssistant: false,
  hasWifi: false,
  hasConditioner: false,
  hasWorkSpace: false,
};

type RoomsFilterProps = {
  onReset: () => void;
};

const RoomsFilter: React.FC<RoomsFilterProps> = ({ onReset }) => {
  const { searchFilters, handleChangeFilter, handleResetSearchFilters } = useFiltersQuery();

  const handleResetFilters = useCallback(
    e => {
      e.preventDefault();
      handleResetSearchFilters();
      onReset();
    },
    [handleResetSearchFilters, onReset]
  );

  const data = { ...initialState, ...searchFilters };

  return (
    <section className='filters__wrapper'>
      <h2 className='visually-hidden'>Поиск номеров в отеле toxin</h2>
      <RoomsFilterList data={data} handleChange={handleChangeFilter}>
        <DateOfStayField data={data} onChange={handleChangeFilter} title='Дата пребывания в отеле' />
        <GuestsCounter data={data} onChange={handleChangeFilter} />
        <RangeSliderField
          label='Диапазон цены'
          description='Стоимость за сутки пребывания в номере'
          name='price'
          onChange={handleChangeFilter}
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

export default React.memo(RoomsFilter);
