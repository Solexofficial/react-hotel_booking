import React from 'react';
import { TableBody as MuiTableBody, TableCell, TableRow, TableBodyProps as MuiTableBodyProps } from '@mui/material';

type TableBodyProps = MuiTableBodyProps & {
  itemsCount?: number;
  page?: number;
  rowsPerPage?: number;
};

const TableBody: React.FC<TableBodyProps> = ({ itemsCount, page, rowsPerPage, children }) => {
  const emptyRows = Number(page) > 0 ? Math.max(0, (1 + Number(page)) * Number(rowsPerPage) - Number(itemsCount)) : 0;

  return (
    <MuiTableBody>
      {children}
      {emptyRows > 0 && (
        <TableRow
          sx={{
            height: 68 * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </MuiTableBody>
  );
};

export default TableBody;
