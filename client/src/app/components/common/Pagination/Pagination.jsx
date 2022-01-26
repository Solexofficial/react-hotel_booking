import { Pagination as MuiPagination } from '@mui/material';
import React from 'react';

const Pagination = ({ items, pageSize, currentPage, onChange, ...rest }) => {
  const itemsCount = items.length;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1 || itemsCount === 0) return null;

  return (
    <div className='pagination'>
      <MuiPagination
        count={pagesCount}
        onChange={onChange}
        page={currentPage}
        defaultPage={0}
        size='large'
        variant='outlined'
        {...rest}
      />
    </div>
  );
};

export default Pagination;
