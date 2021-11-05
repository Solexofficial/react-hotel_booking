import React from 'react';
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';

const Checkbox = ({ name, label, value, onChange }) => {
  const convertToDefEventParam = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color='primary'
            checked={value}
            onChange={e => onChange(convertToDefEventParam(name, e.target.checked))}
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export default Checkbox;
