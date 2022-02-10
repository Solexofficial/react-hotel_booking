import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeBooking } from '../../../../../store/bookings';
import { removeBookingRoom } from '../../../../../store/rooms';
import { BookingType } from '../../../../../types/types';
import { getDateDDMMYYYY } from '../../../../../utils/formatDate';
import history from '../../../../../utils/history';
import Tooltip from '../../../../common/Tooltip';
import { getGuestsLabel } from '../../../GuestsCounter/GuestsCounter';

type BookingTableRowProps = {
  row: BookingType;
};

const BookingTableRow: React.FC<BookingTableRowProps> = ({ row }) => {
  const dispatch = useDispatch();

  const handleRemoveBooking = () => {
    dispatch(removeBooking(row._id));
    dispatch(removeBookingRoom({ roomId: row.roomId, _id: row._id || '' }));
  };

  const handleOpenUserPage = (userId: string) => {
    history.push(`/profile/${userId}`);
  };

  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        {row._id}
      </TableCell>
      <TableCell component='th' scope='row'>
        {getDateDDMMYYYY(row.arrivalDate)}
      </TableCell>
      <TableCell>{getDateDDMMYYYY(row.departureDate)}</TableCell>
      <TableCell>{getGuestsLabel(row.adults, row.children, row.babies)}</TableCell>
      <TableCell align='right'>{row.totalPrice}&#8381;</TableCell>
      <TableCell>
        <div className='booking-row__btns'>
          <Tooltip title='Страница пользователя' disableInteractive={true}>
            <IconButton
              aria-label='expand row'
              size='small'
              color='primary'
              onClick={() => handleOpenUserPage(row.userId || 'not found')}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Отменить бронирование' disableInteractive={true}>
            <IconButton aria-label='expand row' size='small' color='error' onClick={handleRemoveBooking}>
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BookingTableRow;
