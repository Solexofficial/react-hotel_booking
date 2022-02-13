import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
} from '@mui/material';
import React from 'react';

type RadioGroupType = MuiRadioGroupProps & {
  label?: string;
  items: Array<{ id: string; title: string }>;
};

const RadioGroupField: React.FC<RadioGroupType> = ({ name, label, value, onChange, items }) => {
  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map(item => (
          <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title || ''} />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};

export default RadioGroupField;
