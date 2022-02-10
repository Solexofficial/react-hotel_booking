import React from 'react';
import { useSelector } from 'react-redux';
import { getBookingsByUserId } from '../../../../store/bookings';
import { getCurrentUserId } from '../../../../store/users';
import BookingCard from '../../booking/BookingCard/BookingCard';

const ProfileBooking = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const bookings = useSelector(getBookingsByUserId(currentUserId || 'not found'));

  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ marginBottom: '20px' }}>Мои бронирования</h1>
      <div className='booking-list' style={{ width: '100%' }}>
        {bookings.map(booking => (
          <BookingCard key={booking._id} {...booking} />
        ))}
        {bookings.length === 0 && <h3>Список бронирований пуст</h3>}
      </div>
    </div>
  );
};

export default ProfileBooking;
