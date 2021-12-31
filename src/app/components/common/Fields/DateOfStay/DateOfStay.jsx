import React from 'react';
import DatePickerField from '../datePickerField';

const DateOfStay = ({ onChange, value, name }) => {
  const handleChange = ({ target }) => {
    onChange({ target: { name: name, value: { ...value, [target.name]: target.value } } });
  };

  return (
    <div className='dateOfStay-wrapper'>
      <div className='dateOfStay'>
        <DatePickerField label='Дата прибытия' name='arrival' onChange={handleChange} value={value.arrival} />
      </div>
      <div className='dateOfStay'>
        <DatePickerField
          label='Дата выезда'
          name='departure'
          minDate={value.arrival}
          onChange={handleChange}
          value={value.departure}
          className='dateOfStay'
        />
      </div>
    </div>
  );
};

export default DateOfStay;
