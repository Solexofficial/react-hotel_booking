import React from 'react';
import Counter from '../../common/Counter';
import declOfNum from '../../../utils/declOfNum';

const GuestsCounter = ({ data, onChange }) => {
  const getGuestsLabel = () => {
    const guests = [data.adults, data.children, data.babies];
    const countGuests = guests.reduce((acc, cur) => acc + cur, 0);
    const countBabies = Number(data.babies);

    const guestsStr = `${countGuests} ${declOfNum(countGuests, ['гость', 'гостя', 'гостей'])}`;
    const babiesStr = `${countBabies} ${declOfNum(countBabies, ['младенец', 'младенца', 'младенцев'])}`;

    if (countGuests > 0 && countBabies > 0) {
      return `${guestsStr} ${babiesStr}`;
    }

    return countGuests > 0 ? guestsStr : 'Сколько гостей';
  };

  return (
    <>
      <p className='guests-label'>{getGuestsLabel()}</p>
      <Counter name='adults' label='Взрослые' min={0} max={10} onChange={onChange} value={data.adults} />
      <Counter name='children' label='Дети' min={0} max={10} onChange={onChange} value={data.children} />
      <Counter name='babies' label='Младенцы' min={0} max={10} onChange={onChange} value={data.babies} />
    </>
  );
};

export default GuestsCounter;
