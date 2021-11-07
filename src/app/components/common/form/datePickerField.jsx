import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import DatePicker from '@mui/lab/DatePicker';
import React from 'react';

const DatePickerField = ({ label, name, value, onChange, ...rest }) => {
  const convertToDefEventParam = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
      <DatePicker
        mask='__.__.____'
        label={label}
        value={value}
        onChange={date => {
          onChange(convertToDefEventParam(name, new Date(date).getTime()));
        }}
        {...rest}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DatePickerField;
