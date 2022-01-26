import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import DatePicker from '@mui/lab/DatePicker';
import React from 'react';

const DatePickerField = ({ label, name, value, minDate, onChange, error, ...rest }) => {
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
        minDate={minDate || Date.now()}
        inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
        onChange={date => {
          onChange(convertToDefEventParam(name, new Date(date).getTime()));
        }}
        {...rest}
        renderInput={params => <TextField {...params} {...(error && { error: true, helperText: error })} />}
      />
    </LocalizationProvider>
  );
};

export default DatePickerField;
