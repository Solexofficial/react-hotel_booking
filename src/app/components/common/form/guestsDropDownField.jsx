import React from 'react';
import declOfNum from '../../../utils/declOfNum';
import Accordion from '../../ui/accordion';
import NumberField from './numberField';

const GuestsDropDownField = ({ value, setData, name }) => {
  const [data, dataKey] = [value, name];
  console.log(data);

  const getAccordionLabel = () => {
    console.log('label accordion', data);
    const countGuests = Object.values(data).reduce((acc, cur) => acc + cur.value, 0);
    const countBabies = Number(data.babies.value);
    const guestsStr = `${countGuests} ${declOfNum(countGuests, ['гость', 'гостя', 'гостей'])}`;
    const babiesStr = `${countBabies} ${declOfNum(countBabies, ['младенец', 'младенца', 'младенцев'])}`;

    if (countGuests > 0 && countBabies > 0) {
      return `${guestsStr} ${babiesStr}`;
    }

    return countGuests > 0 ? guestsStr : 'Сколько гостей';
  };

  const handleIncrease = name => {
    setData(prevState => {
      return {
        ...prevState,
        [dataKey]: {
          ...prevState[dataKey],
          [name]: {
            ...prevState[dataKey][name],
            value: prevState[dataKey][name].value + 1,
          },
        },
      };
    });
  };

  if (data) {
    return (
      <Accordion label={getAccordionLabel()}>
        {Object.values(data).map(guest => {
          const { value, name, label } = guest;
          return <NumberField key={name} label={label} name={name} value={value} onIncrease={handleIncrease} />;
        })}
      </Accordion>
    );
  }
  return <h1>Loading...</h1>;
};

export default GuestsDropDownField;
