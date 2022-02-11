import { SelectProps as MuiSelectProps } from '@mui/material';
import React from 'react';
import { SelectField } from '../../../common/Fields';
import { OptionsItemType } from '../../../common/Fields/SelectField/SelectField';

type RoomsDisplayCountProps = MuiSelectProps & {
  count: number;
  setCount: (e: any) => void;
  options: OptionsItemType[];
};

const RoomsDisplayCount: React.FC<RoomsDisplayCountProps> = ({ count, setCount, options }) => {
  return (
    <SelectField
      style={{ minWidth: '140px' }}
      name='pageSize'
      autoWidth={true}
      label='Отображать по'
      value={String(count)}
      onChange={e => setCount(e)}
      options={options}
    />
  );
};

export default RoomsDisplayCount;
