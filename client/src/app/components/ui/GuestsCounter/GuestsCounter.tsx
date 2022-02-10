import React from 'react';
import Counter from '../../common/Counter';
import declOfNum from '../../../utils/declOfNum';

export const getGuestsLabel = (adults: number, children: number, babies: number) => {
  const guests = [Number(adults), Number(children), Number(babies)];
  const countGuests = guests.reduce((acc, cur) => acc + cur, 0);
  const countBabies = Number(babies);

  const guestsStr = `${countGuests} ${declOfNum(countGuests, ['гость', 'гостя', 'гостей'])}`;
  const babiesStr = `${countBabies} ${declOfNum(countBabies, ['младенец', 'младенца', 'младенцев'])}`;

  if (countGuests > 0 && countBabies > 0) {
    return `${guestsStr} ${babiesStr}`;
  }

  return countGuests > 0 ? guestsStr : 'Сколько гостей';
};

type GuestsCounterProps = {
  data: { adults: number; children: number; babies: number };
  onChange: ({ target }: any) => void;
};

const GuestsCounter: React.FC<GuestsCounterProps> = ({ data, onChange }) => {
  const { adults, children, babies } = data;

  return (
    <>
      <p className='guests-label'>{getGuestsLabel(adults, children, babies)}</p>
      <Counter name='adults' label='Взрослые' min={1} max={10} onChange={onChange} value={+adults} />
      <Counter name='children' label='Дети' min={0} max={10} onChange={onChange} value={children} />
      <Counter name='babies' label='Младенцы' min={0} max={10} onChange={onChange} value={+babies} />
    </>
  );
};

export default React.memo(GuestsCounter);
