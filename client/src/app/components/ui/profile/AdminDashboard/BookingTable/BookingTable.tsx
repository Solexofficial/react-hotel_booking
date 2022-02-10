import React from 'react';
import { BookingType } from '../../../../../types/types';
import { Table, TableBody, TableHeader } from '../../../../common/Table';
import BookingTableRow from './BookingTableRow';

type BookingTableProps = {
  bookings: BookingType[];
  roomNumber: string | number;
};

const BookingTable: React.FC<BookingTableProps> = ({ bookings, roomNumber }) => {
  const headCells = [
    { id: 'bookingId', label: 'ID' },
    { id: 'arrivalDate', label: 'Дата заезда' },
    { id: 'departureDate', label: 'Дата выезда' },
    { id: 'guests', label: 'Кол-во гостей' },
    { id: 'totalPrice', label: 'Цена', numeric: true },
  ];
  return (
    <>
      <h3 style={{ margin: 10 }}>{`Список бронирований номера №${roomNumber}`}</h3>
      <Table size='small' aria-label='purchases'>
        <TableHeader headCells={headCells} />
        <TableBody>
          {bookings.map(bookingRow => (
            <BookingTableRow key={bookingRow._id} row={bookingRow} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default BookingTable;
