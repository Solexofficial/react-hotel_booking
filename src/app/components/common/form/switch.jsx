import React from 'react';
import { FormControl, Switch as MuiSwitch } from '@mui/material';
import { FormControlLabel } from '@material-ui/core';

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
