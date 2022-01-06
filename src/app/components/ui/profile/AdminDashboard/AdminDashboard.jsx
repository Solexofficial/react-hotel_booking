import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Collapse, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useFetching } from '../../../../hooks';
import bookingService from '../../../../services/booking.service';
import roomsService from '../../../../services/rooms.service';
import { getDateDDMMYYYY } from '../../../../utils/formatDate';
import Chip from '../../../common/Chip/Chip';
import { getGuestsLabel } from '../../GuestsCounter/GuestsCounter';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: 'numberRoom',
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

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = () => {
  return (
    <Toolbar>
      <Typography sx={{ flex: '1 1 100%' }} variant='h5' id='tableTitle' component='div'>
        Список всех номеров отеля
      </Typography>
    </Toolbar>
  );
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [bookings, setBookings] = React.useState([]);

  const [getBookings, bookingsIsLoading] = useFetching(async roomId => {
    const { content } = await bookingService.getRoomBookings(roomId);
    setBookings(content);
  });

  React.useEffect(() => {
    getBookings(row._id);
  }, []);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component='th' scope='row'>
          <Link to={`/rooms/${row.numberRoom}`}>{row.numberRoom}</Link>
        </TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell align='right'>{row.rate}</TableCell>
        <TableCell align='right'>{row.rentPerDay}&#8381;</TableCell>
        <TableCell align='right'>
          {bookings.length > 0 ? (
            <>
              <Chip
                label='Забронирован'
                color='error'
                onDelete={() => setOpen(!open)}
                deleteIcon={
                  <Tooltip title='Подробнее'>
                    <IconButton aria-label='expand row' size='small'>
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </Tooltip>
                }
              />
            </>
          ) : (
            <Chip label='Свободен' color='success' />
          )}
        </TableCell>
        <TableCell align='right'>
          <Tooltip title='Редактировать номер' disableInteractive={true}>
            <IconButton
              aria-label='expand row'
              size='small'
              color='primary'
              onClick={() => console.log(`/rooms/${row.numberRoom}/edit`)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Список бронирований номера №{row.numberRoom}
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Дата заезда</TableCell>
                    <TableCell>Дата выезда</TableCell>
                    <TableCell>Гостей</TableCell>
                    <TableCell align='right'>Итоговая стоимость</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map(bookingRow => (
                    <TableRow key={bookingRow._id}>
                      <TableCell component='th' scope='row'>
                        {getDateDDMMYYYY(bookingRow.arrivalDate)}
                      </TableCell>
                      <TableCell>{getDateDDMMYYYY(bookingRow.departureDate)}</TableCell>
                      <TableCell>{getGuestsLabel(bookingRow.adults, bookingRow.children, bookingRow.babies)}</TableCell>
                      <TableCell align='right'>{bookingRow.totalPrice}&#8381;</TableCell>
                      <TableCell>
                        <Tooltip title='Страница пользователя' disableInteractive={true}>
                          <IconButton
                            aria-label='expand row'
                            size='small'
                            color='primary'
                            onClick={() => console.log(bookingRow.userId)}
                          >
                            <AccountCircleIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Отменить бронирование' disableInteractive={true}>
                          <IconButton
                            aria-label='expand row'
                            size='small'
                            color='error'
                            onClick={() => console.log(bookingRow._id)}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('numberRoom');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rooms, setRoomsList] = React.useState();

  const [fetchingRooms, roomsIsLoading] = useFetching(async () => {
    const { content } = await roomsService.getAll();
    setRoomsList(content);
  });

  React.useEffect(() => {
    fetchingRooms();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rooms.length) : 0;

  return (
    <>
      {!roomsIsLoading && (
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size='medium'>
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rooms.length}
                />
                <TableBody>
                  {stableSort(rooms, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => (
                      <Row key={row.numberRoom} row={row} />
                    ))}
                  {emptyRows > 0 && (
                    <TableRow
                      sx={{
                        height: 65 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={rooms.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      )}
    </>
  );
}
