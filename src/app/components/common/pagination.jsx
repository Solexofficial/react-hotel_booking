import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ itemsCount, pageSize, onChange, ...rest }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;

  return (
    <div className='pagination'>
      <MuiPagination count={pageCount} defaultPage={1} onChange={onChange} size='large' variant='outlined' {...rest} />
      <p className='pagination__info'>{`1 - ${pageSize} из ${itemsCount} вариантов аренды`}</p>
    </div>
  );
};

export default Pagination;
