import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import useFetching from '../../../../hooks/useFetching';
import bookingService from '../../../../services/booking.service';
import BookingCard from '../../booking/BookingCard/BookingCard';

const ProfileBooking = () => {
  const [bookings, setBookings] = useState([]);
  const { currentUser } = useAuth();

  const [getUserBookings, userBookingsLoading] = useFetching(async () => {
    const { content } = await bookingService.getUserBookings(currentUser._id);
    setBookings(content);
  });

  useEffect(() => {
    getUserBookings();
  }, []);

  if (!userBookingsLoading) {
    console.log(bookings);
  }

  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ marginBottom: '20px' }}>Мои бронирования</h1>
      <div className='booking-list' style={{ width: '100%' }}>
        {!userBookingsLoading && bookings.map(booking => <BookingCard key={booking._id} {...booking} />)}
      </div>
    </div>
  );
};

export default ProfileBooking;
