import { TextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import React from 'react';

const TextAreaField: React.FC<MuiTextFieldProps> = ({ label, name, value, onChange, error, rows = 5 }) => {
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
