import React from 'react';
import DatePickerField from './datePickerField';

const DateOfStayField = ({ onChange, value, name }) => {
  const handleChange = ({ target }) => {
    onChange({ target: { name: name, value: { ...value, [target.name]: target.value } } });
  };

  return (
    <>
      <DatePickerField label='Дата прибытия' name='arrival' onChange={handleChange} value={value.arrival} />
      <DatePickerField
        label='Дата выезда'
        name='departure'
        minDate={value.arrival}
        onChange={handleChange}
        value={value.departure}
      />
    </>
  );
};

export default DateOfStayField;
