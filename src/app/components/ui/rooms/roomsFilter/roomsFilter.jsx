import React, { useCallback } from 'react';
import { Checkbox, CheckBoxList, DateOfStayField, RangeSliderField } from '../../../common/Fields';
import RoomsFilterList from './roomsFiltersList';
import Button from '../../../common/Button';
import Counter from '../../../common/Counter';
import declOfNum from '../../../../utils/declOfNum';

const RoomsFilter = ({ data, setData, handleResetForm, handleInputChange }) => {
  const getGuestsLabel = useCallback(() => {
    const guests = [data.adults, data.children, data.babies];
    const countGuests = guests.reduce((acc, cur) => acc + cur, 0);
    const countBabies = Number(data.babies);

    const guestsStr = `${countGuests} ${declOfNum(countGuests, ['гость', 'гостя', 'гостей'])}`;
    const babiesStr = `${countBabies} ${declOfNum(countBabies, ['младенец', 'младенца', 'младенцев'])}`;

    if (countGuests > 0 && countBabies > 0) {
      return `${guestsStr} ${babiesStr}`;
    }

    return countGuests > 0 ? guestsStr : 'Сколько гостей';
  }, []);
  console.log('rooms filter render');

  return (
    <section className='filters__wrapper'>
      <h2 className='visually-hidden'>Поиск номеров в отеле toxin</h2>
      <RoomsFilterList data={data} handleChange={handleInputChange}>
        <DateOfStayField title='Дата пребывания в отеле' name='dateOfStay' />
        <p className='search-form__guests-label'>{getGuestsLabel()}</p>
        <Counter name='adults' label='Взрослые' min={0} max={10} />
        <Counter name='children' label='Дети' min={0} max={10} />
        <Counter name='babies' label='Младенцы' min={0} max={10} />
        <RangeSliderField
          label='Диапазон цены'
          description='Стоимость за сутки пребывания в номере'
          name='rentPerDay'
          min={0}
          max={15000}
        />
        <CheckBoxList title='Условия размещения' data={data}>
          <Checkbox label='Можно c питомцами' name='canPets' />
          <Checkbox label='Можно курить' name='canSmoke' />
          <Checkbox label='Можно пригласить гостей (до 10 человек)' name='canInvite' />
        </CheckBoxList>
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

export default React.memo(RoomsFilter);
