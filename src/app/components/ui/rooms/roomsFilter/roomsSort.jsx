import React from 'react';
import { SelectField } from '../../../common/Fields/fields';

const roomsSortArray = [
  { name: 'По убыванию', value: { path: 'numberRoom', order: 'desc' } },
  { name: 'По возрастанию', value: { path: 'numberRoom', order: 'asc' } },
  { name: 'Популярное', value: { path: 'countReviews', order: 'desc' } },
  { name: 'Высокий рейтинг', value: { path: 'rate', order: 'desc' } },
  { name: 'Сначала дешёвые', value: { path: 'rentPerDay', order: 'asc' } },
  { name: 'Сначала дорогие', value: { path: 'rentPerDay', order: 'desc' } },
];

const RoomsSort = ({ sortBy, onSort }) => {
  return (
    <SelectField
      style={{ minWidth: '200px' }}
      label='Сортировать'
      value={JSON.stringify(sortBy)}
      onChange={onSort}
      options={roomsSortArray}
    />
  );
};

export default RoomsSort;
