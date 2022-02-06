import React from 'react';
import DatePickerField from '../DatePickerField';

const oneDayMs = 86_000_000;

const DateOfStay = ({ onChange, data, errors }) => {
  const { arrivalDate, departureDate } = data;

  return (
    <div className='dateOfStay-wrapper'>
      <div className='dateOfStay'>
        <DatePickerField
          label='Дата прибытия'
          name='arrivalDate'
          error={errors?.arrivalDate}
          onChange={onChange}
          value={+arrivalDate}
        />
      </div>
      <div className='dateOfStay'>
        <DatePickerField
          label='Дата выезда'
          name='departureDate'
          error={errors?.departureDate}
          minDate={+arrivalDate + oneDayMs}
          onChange={onChange}
          value={+departureDate}
          className='dateOfStay'
        />
      </div>
    </div>
  );
};

export default DateOfStay;
