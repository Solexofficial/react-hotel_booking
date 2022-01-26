import { TextField } from '@mui/material';
import React from 'react';

const TextAreaField = ({ label, name, value, onChange, error, rows = 5 }) => {
  return (
    <>
      <TextField
        label={label}
        name={name}
        multiline
        rows={rows}
        value={value}
        onChange={onChange}
        fullWidth
        {...(error && { error: true, helperText: error })}
      />
    </>
  );
};

export default TextAreaField;
