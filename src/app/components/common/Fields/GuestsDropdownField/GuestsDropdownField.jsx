import React, { useCallback } from 'react';
import declOfNum from '../../../../utils/declOfNum';
import Accordion from '../../Accordion';
import Counter from '../../Counter';

const GuestsDropdownField = ({ value, setData, name }) => {
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

  const handleChange = useCallback(
    (name, value) => {
      setData(prevState => ({
        ...prevState,
        [dataKey]: prevState[dataKey].map(el => (el.name === name ? { ...el, value: value } : el)),
      }));
    },
    [setData, dataKey]
  );

  if (data) {
    return (
      <Accordion label={getAccordionLabel()}>
        {data.map(guest => {
          const { value, name, label } = guest;
          return (
            <div key={name} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
              <p>{label}</p>
              <Counter name={name} value={value} min={0} max={10} onChange={handleChange} />
            </div>
          );
        })}
      </Accordion>
    );
  }
};

export default GuestsDropdownField;
