import { Pagination as MuiPagination, PaginationProps as MuiPaginationProps } from '@mui/material';
import React from 'react';

type PaginationProps = MuiPaginationProps & {
  items: any[];
  pageSize: number;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ items, pageSize, currentPage, onChange, ...rest }) => {
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
