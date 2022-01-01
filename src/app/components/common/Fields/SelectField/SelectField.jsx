import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';

const SelectField = ({ label, name, value, defaultValue, onChange, options, error, ...rest }) => {
  const optionsArray = Object.keys(options).map(option => ({
    name: options[option].name,
    value: typeof options[option].value === 'object' ? JSON.stringify(options[option].value) : options[option].value,
  }));

  return (
    <FormControl variant='outlined' {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange} {...rest}>
        <MenuItem value='' disabled>
          {defaultValue || label}
        </MenuItem>
        {optionsArray.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default React.memo(SelectField);
