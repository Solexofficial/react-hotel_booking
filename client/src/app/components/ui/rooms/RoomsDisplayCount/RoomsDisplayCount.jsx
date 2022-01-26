import React from 'react';
import { SelectField } from '../../../common/Fields';

const RoomsDisplayCount = ({ count, setCount, options }) => {
  return (
    <SelectField
      style={{ minWidth: '140px' }}
      autoWidth={true}
      label='Отображать по'
      value={count}
      onChange={e => setCount(e)}
      options={options}
    />
  );
};

export default RoomsDisplayCount;
