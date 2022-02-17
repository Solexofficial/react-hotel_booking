import { TableCell, TableHead, TableRow, TableSortLabel, TableHeadProps as MuiTableHeaderProps } from '@mui/material';
import React from 'react';

type TableHeadCell<T> = {
  id: keyof T;
  numeric?: boolean;
  disablePadding?: boolean;
  label: string;
};

type TableHeaderProps<T> = MuiTableHeaderProps & {
  headCells: Array<TableHeadCell<T>>;
  sortBy?: {
    path: keyof T;
    order: 'asc' | 'desc';
  };
  onRequestSort?: (event: Event | React.MouseEvent<unknown, MouseEvent>, property: keyof T) => void;
};

function TableHeader<T>({ headCells, sortBy, onRequestSort }: TableHeaderProps<T>) {
  const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
    if (onRequestSort) {
      onRequestSort(event, property);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={String(headCell.id)}
            align={headCell?.numeric ? 'right' : 'left'}
            padding={headCell?.disablePadding ? 'none' : 'normal'}
            sortDirection={sortBy && sortBy.path === headCell.id ? sortBy.order : false}
          >
            {sortBy && (
              <TableSortLabel
                active={sortBy.path === headCell.id}
                direction={sortBy.path === headCell.id ? sortBy.order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {sortBy.path === headCell.id ? (
                  <span className='visually-hidden'>
                    {sortBy.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            )}
            {!sortBy && headCell.label}
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
