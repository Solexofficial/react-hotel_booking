import { TablePagination } from '@mui/material';
import React from 'react';
import { useFetching, usePagination, useSort } from '../../../../../hooks';
import roomsService from '../../../../../services/rooms.service';
import { Table, TableBody, TableHeader } from '../../../../common/Table';
import RoomsListTableRow from './RoomsListTableRow';

const headCells = [
  {
    id: 'roomNumber',
    numeric: false,
    disablePadding: false,
    label: '№ Номера',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Тип',
  },
  {
    id: 'rate',
    numeric: true,
    disablePadding: false,
    label: 'Рейтинг',
  },
  {
    id: 'rentPerDay',
    numeric: true,
    disablePadding: false,
    label: 'Аренда в сутки',
  },
  {
    id: 'isBooked',
    numeric: true,
    disablePadding: false,
    label: 'Статус',
  },
];

const RoomsListTable = () => {
  const rowsPerPageOptions = [5, 10, 25];

  const [rooms, setRoomsList] = React.useState([]);
  const [fetchingRooms, roomsIsLoading] = useFetching(async () => {
    const { content } = await roomsService.getAll();
    setRoomsList(content);
  });

  React.useEffect(() => {
    fetchingRooms();
  }, []);

  const { sortedItems, sortBy, handleRequestSort } = useSort(rooms, { path: 'roomNumber', order: 'desc' });
  const {
    itemsListCrop: roomsCroppedList,
    currentPage,
    pageSize,
    handleChangePage,
    handleChangePageSize,
  } = usePagination(sortedItems, rowsPerPageOptions[0]);

  return (
    <>
      {!roomsIsLoading && (
        <>
          <Table title='Список номеров'>
            <TableHeader headCells={headCells} sortBy={sortBy} onRequestSort={handleRequestSort} />
            <TableBody itemsCount={sortedItems.length} page={currentPage - 1} rowsPerPage={pageSize}>
              {roomsCroppedList.map(row => (
                <RoomsListTableRow key={row._id} row={row} />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={rooms.length}
            rowsPerPage={pageSize}
            page={currentPage - 1}
            onPageChange={(event, value) => handleChangePage(event, value + 1)}
            onRowsPerPageChange={handleChangePageSize}
          />
        </>
      )}
    </>
  );
};

export default RoomsListTable;
