import React from 'react';
import { TableBody as MuiTableBody, TableCell, TableRow } from '@mui/material';

const TableBody = ({ itemsCount, page, rowsPerPage, children }) => {
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - itemsCount) : 0;

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
