import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as MuiRadioGroup } from '@mui/material';
import React from 'react';

const RadioGroupField = ({ name, label, value, onChange, items }) => {
  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map(item => (
          <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};

export default RadioGroupField;
