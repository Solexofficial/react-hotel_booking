import React from 'react';
import { FormControl, FormControlLabel, Switch as MuiSwitch, SwitchProps as MuiSwitchProps } from '@mui/material';

type onChange = {
  target: {
    name: string;
    value: boolean;
  };
};

type SwitchProps = MuiSwitchProps & {
  label: string;
  onChange: (fn: onChange) => void;
};

const Switch: React.FC<SwitchProps> = ({ label, value, name, onChange, ...rest }) => {
  const convertToDefEventParam = (name: string, value: boolean) => ({
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
            onChange={(e, checked) => onChange(convertToDefEventParam(name || '', checked))}
            {...rest}
          />
        }
        label={label || ''}
      />
    </FormControl>
  );
};

export default Switch;
