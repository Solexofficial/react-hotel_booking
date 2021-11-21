import React from 'react';
import declOfNum from '../../../utils/declOfNum';
import Accordion from '../../ui/accordion';
import NumberField from './numberField';

const GuestsDropDownField = ({ value, setData, onChange, name }) => {
  const [data, dataKey] = [value, name];

  const getAccordionLabel = () => {
    const countGuests = data.reduce((acc, cur) => acc + cur.value, 0);
    const countBabies = Number(data.find(el => el.name === 'babies').value);
    const guestsStr = `${countGuests} ${declOfNum(countGuests, ['гость', 'гостя', 'гостей'])}`;
    const babiesStr = `${countBabies} ${declOfNum(countBabies, ['младенец', 'младенца', 'младенцев'])}`;

    if (countGuests > 0 && countBabies > 0) {
      return `${guestsStr} ${babiesStr}`;
    }

    return countGuests > 0 ? guestsStr : 'Сколько гостей';
  };

  const handleIncrease = name => {
    setData(prevState => ({
      ...prevState,
      [dataKey]: prevState[dataKey].map(el => (el.name === name ? { ...el, value: el.value + 1 } : el)),
    }));
  };
  const handleDecrease = name => {
    setData(prevState => ({
      ...prevState,
      [dataKey]: prevState[dataKey].map(el => (el.name === name ? { ...el, value: Math.max(el.value - 1, 0) } : el)),
    }));
  };

  if (data) {
    return (
      <Accordion label={getAccordionLabel()}>
        {data.map(guest => {
          const { value, name, label } = guest;
          return (
            <NumberField
              key={name}
              label={label}
              name={name}
              value={value}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          );
        })}
      </Accordion>
    );
  }
  return <h1>Loading...</h1>;
};

export default GuestsDropDownField;
