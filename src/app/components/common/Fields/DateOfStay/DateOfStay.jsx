import React from 'react';
import DatePickerField from '../DatePickerField';

const DateOfStay = ({ onChange, data }) => {
  const { arrivalDate, departureDate } = data;

  return (
    <div className='dateOfStay-wrapper'>
      <div className='dateOfStay'>
        <DatePickerField label='Дата прибытия' name='arrivalDate' onChange={onChange} value={arrivalDate} />
      </div>
      <div className='dateOfStay'>
        <DatePickerField
          label='Дата выезда'
          name='departureDate'
          minDate={arrivalDate}
          onChange={onChange}
          value={departureDate}
          className='dateOfStay'
        />
      </div>
    </div>
  );
};

export default DateOfStay;
