import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

const SelectField = ({ label, name, value, defaultValue, onChange, options, error }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map(optionName => ({
          name: options[optionName].name,
          value: options[optionName]._id,
        }))
      : options.map(optionName => ({
          name: optionName.name,
          value: optionName._id,
        }));

  return (
    <FormControl variant='outlined' {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
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
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default React.memo(SelectField);
