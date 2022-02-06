import React from 'react';
import { TextField } from '@mui/material';

type InputTypes = {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: () => void;
  error?: string | null;
  autoFocus?: boolean;
  style?: object;
  [rest: string]: any;
};

const InputField: React.FC<InputTypes> = ({ label, type = 'text', name, value, onChange, error = null, ...rest }) => {
  return (
    <TextField
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      {...rest}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default React.memo(InputField);
