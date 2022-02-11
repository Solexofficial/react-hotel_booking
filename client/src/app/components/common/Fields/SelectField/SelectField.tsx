import React from 'react';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  SelectProps as MuiSelectProps,
} from '@mui/material';

type SelectFieldType = MuiSelectProps & {
  label?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  error?: string;
  name: string;
  options: OptionsItemType[];
  multiple?: boolean;
};

export type OptionsItemType = {
  name: string;
  value: string | number | OptionSortType | { path: string; order: string };
};

export type OptionSortType = {
  name: string;
  value: {
    path: string;
    order: string;
  };
};

const SelectField: React.FC<SelectFieldType> = ({
  label,
  name,
  value,
  defaultValue,
  onChange,
  options,
  error,
  ...rest
}) => {
  const optionsArray = options.map(option => ({
    name: option.name,
    value: typeof option.value === 'object' ? JSON.stringify(option.value) : option.value,
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

export default React.memo(SelectField);
