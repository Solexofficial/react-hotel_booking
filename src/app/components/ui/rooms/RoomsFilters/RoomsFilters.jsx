import React from 'react';
import Button from '../../../common/Button';
import { Checkbox, CheckBoxList, DateOfStayField, RangeSliderField } from '../../../common/Fields';
import GuestsCounter from '../../GuestsCounter/GuestsCounter';
import RoomsFilterList from './RoomsFiltersList/RoomsFiltersList';

const RoomsFilter = ({ data, handleResetForm, handleInputChange }) => {
  console.log('rooms filter render');

  return (
    <section className='filters__wrapper'>
      <h2 className='visually-hidden'>Поиск номеров в отеле toxin</h2>
      <RoomsFilterList data={data} handleChange={handleInputChange}>
        <DateOfStayField title='Дата пребывания в отеле' name='dateOfStay' />
        <GuestsCounter data={data} />
        <RangeSliderField
          label='Диапазон цены'
          description='Стоимость за сутки пребывания в номере'
          name='rentPerDay'
          min={0}
          max={15000}
        />
        <CheckBoxList title='Удобства' data={data}>
          <Checkbox label='Wi-Fi' name='hasWifi' />
          <Checkbox label='Кондиционер' name='hasConditioner' />
          <Checkbox label='Рабочее место' name='hasWorkSpace' />
        </CheckBoxList>
        <CheckBoxList title='Условия размещения' data={data}>
          <Checkbox label='Можно c питомцами' name='canPets' />
          <Checkbox label='Можно курить' name='canSmoke' />
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
        <Button onClick={handleResetForm} fullWidth>
          Сбросить Фильтры
        </Button>
      </RoomsFilterList>
    </section>
  );
};

export default React.memo(RoomsFilter);
