import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import DatePicker from '@mui/lab/DatePicker';
import React from 'react';
import { Box } from '@mui/system';

const DatePickerField = ({ label, name, value, setData, ...rest }) => {
  return (
    <Box style={{ margin: '15px 0' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <DatePicker
          mask='__.__.____'
          label={label}
          value={value}
          onChange={newValue => {
            setData(prevState => ({
              ...prevState,
              [name]: newValue,
            }));
          }}
          {...rest}
          renderInput={params => <TextField {...params} size='small' />}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DatePickerField;
