import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetching from '../../../../hooks/useFetching';
import bookingService from '../../../../services/booking.service';
import { getCurrentUserId } from '../../../../store/users';
import BookingCard from '../../booking/BookingCard/BookingCard';

const ProfileBooking = () => {
  const [bookings, setBookings] = useState([]);
  const currentUserId = useSelector(getCurrentUserId());

  const [getUserBookings, userBookingsLoading] = useFetching(async () => {
    const { content } = await bookingService.getUserBookings(currentUserId);
    setBookings(content);
  });

  useEffect(() => {
    getUserBookings();
  }, []);

  const handleRemoveBooking = async bookingId => {
    try {
      const id = await bookingService.remove(bookingId);
      setBookings(prevState => prevState.filter(booking => booking._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ marginBottom: '20px' }}>Мои бронирования</h1>
      <div className='booking-list' style={{ width: '100%' }}>
        {!userBookingsLoading &&
          bookings.map(booking => <BookingCard key={booking._id} {...booking} onRemove={handleRemoveBooking} />)}
      </div>
    </div>
  );
};

export default ProfileBooking;
