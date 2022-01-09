import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { getDateDDMMYYYY } from '../../../../../utils/formatDate';
import Tooltip from '../../../../common/Tooltip';
import { getGuestsLabel } from '../../../GuestsCounter/GuestsCounter';

const BookingTableRow = ({ row }) => {
  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        {getDateDDMMYYYY(row.arrivalDate)}
      </TableCell>
      <TableCell>{getDateDDMMYYYY(row.departureDate)}</TableCell>
      <TableCell>{getGuestsLabel(row.adults, row.children, row.babies)}</TableCell>
      <TableCell align='right'>{row.totalPrice}&#8381;</TableCell>
      <TableCell>
        <Tooltip title='Страница пользователя' disableInteractive={true}>
          <IconButton aria-label='expand row' size='small' color='primary' onClick={() => console.log(row.userId)}>
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Отменить бронирование' disableInteractive={true}>
          <IconButton aria-label='expand row' size='small' color='error' onClick={() => console.log(row._id)}>
            <CancelIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default BookingTableRow;
