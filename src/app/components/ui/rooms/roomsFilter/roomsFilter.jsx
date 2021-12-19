import React from 'react';
import {
  Checkbox,
  CheckBoxList,
  DateOfStayField,
  GuestsDropDownField,
  RangeSliderField,
} from '../../../common/form/fields';
import RoomsFilterList from './roomsFiltersList';
import Button from '../../buttons/button';

const RoomsFilter = ({ data, setData, handleResetForm, handleInputChange }) => {
  console.log('rooms filter render');

  return (
    <section className='filters__wrapper'>
      <h2 className='visually-hidden'>Поиск номеров в отеле toxin</h2>
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
        <CheckBoxList title='Удобства' data={data}>
          <Checkbox label='Wi-Fi' name='hasWifi' />
          <Checkbox label='Кондиционер' name='hasConditioner' />
          <Checkbox label='Рабочее место' name='hasWorkSpace' />
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
        <Button onClick={handleResetForm}>Сбросить</Button>
      </RoomsFilterList>
    </section>
  );
};

export default RoomsFilter;
