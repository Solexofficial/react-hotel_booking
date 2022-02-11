import { TextField } from '@mui/material';
import React from 'react';
import DatePickerField from '../DatePickerField';

const oneDayMs = 86_000_000;

type DateOfStayProps = {
  data: any;
  errors?: { [x: string]: string };
  onChange: (target: any) => void;
  title?: string;
};

const DateOfStay: React.FC<DateOfStayProps> = ({ onChange, data, errors }) => {
  const { arrivalDate, departureDate } = data;

  return (
    <div className='dateOfStay-wrapper'>
      <div className='dateOfStay'>
        <DatePickerField
          label='Дата прибытия'
          name='arrivalDate'
          minDate={+arrivalDate}
          onChange={onChange}
          value={+arrivalDate}
          renderInput={params => (
            <TextField {...params} {...(errors?.arrivalDate && { error: true, helperText: errors?.arrivalDate })} />
          )}
        />
      </div>
      <div className='dateOfStay'>
        <DatePickerField
          label='Дата выезда'
          name='departureDate'
          minDate={+arrivalDate + oneDayMs}
          onChange={onChange}
          value={+departureDate}
          renderInput={params => (
            <TextField {...params} {...(errors?.departureDate && { error: true, helperText: errors?.departureDate })} />
          )}
        />
      </div>
    </div>
  );
};

export default DateOfStay;
