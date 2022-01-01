import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const InputField = ({ label, type = 'text', name, value, onChange, error = null, ...rest }) => {
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

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default React.memo(InputField);
