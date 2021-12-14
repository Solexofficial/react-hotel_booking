import React from 'react';
import { FormControl, FormControlLabel, Switch as MuiSwitch } from '@mui/material';

const Switch = ({ label, value, name, onChange, ...rest }) => {
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
          <MuiSwitch
            name={name}
            value={value}
            onChange={e => onChange(convertToDefEventParam(name, e.target.checked))}
            {...rest}
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export default Switch;
