import React from 'react';
import declOfNum from '../../../utils/declOfNum';
import Accordion from '../../ui/accordion';
import NumberField from './numberField';

const GuestsDropDownField = ({ value, setData, name }) => {
  const fieldName = name;
  console.log('value', value);
  console.log('fieldName', fieldName);

  const getAccordionLabel = () => {
    const countGuests = Number(value.adults) + Number(value.children) + Number(value.babies);
    const countBabies = Number(value.babies);
    const guestsStr = `${countGuests} ${declOfNum(countGuests, ['гость', 'гостя', 'гостей'])}`;
    const babiesStr = `${countBabies} ${declOfNum(countBabies, ['младенец', 'младенца', 'младенцев'])}`;

    if (countGuests > 0 && countBabies > 0) {
      return `${guestsStr} ${babiesStr}`;
    }

    return countGuests > 0 ? guestsStr : 'Сколько гостей';
  };

  return (
    <>
      <h1>GUESTS</h1>
      <Accordion label={getAccordionLabel()}>
        {/*   <NumberField label='Взрослые' name='adults' value={value.adults} setData={setData} />
        <NumberField label='Дети' name='children' value={value.children} setData={setData} />
        <NumberField label='Младенцы' name='babies' value={value.babies} setData={setData} /> */}
        {Object.values(value).map(guest => {
          const { value, name, label } = guest;
          return (
            <NumberField key={name} label={label} name={name} value={value} setData={setData} fieldName={fieldName} />
          );
        })}
      </Accordion>
      <hr />
      <hr />
      <hr />
      <hr />
    </>
  );
};

export default GuestsDropDownField;
