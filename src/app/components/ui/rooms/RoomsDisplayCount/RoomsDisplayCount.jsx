import React from 'react';
import { SelectField } from '../../../common/Fields';

const RoomsDisplayCount = ({ count, setCount }) => {
  return (
    <SelectField
      style={{ minWidth: '140px' }}
      autoWidth={true}
      label='Отображать по'
      value={count}
      onChange={({ target }) => setCount(target.value)}
      options={[
        { name: '6', value: 6 },
        { name: '12', value: 12 },
        { name: '18', value: 18 },
        { name: '24', value: 24 },
      ]}
    />
  );
};

export default RoomsDisplayCount;
