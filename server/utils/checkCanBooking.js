const Booking = require('../models/Booking');
const moment = require('moment');

const checkCanBooking = async bookingData => {
  const bookings = await Booking.find();

  const hasDuplicateBookingData =
    bookings.filter(
      booking =>
        moment(booking.arrivalDate).toString() === moment(bookingData.arrivalDate).toString() ||
        moment(booking.departureDate).toString() === moment(bookingData.departureDate).toString()
    ).length > 0;

  if (hasDuplicateBookingData) return false;

  const bookedRoomsIds = bookings
    .filter(
      booking =>
        moment(bookingData.arrivalDate).isBetween(moment(booking.arrivalDate), moment(booking.departureDate)) ||
        moment(bookingData.departureDate).isBetween(moment(booking.arrivalDate), moment(booking.departureDate)) ||
        moment(booking.arrivalDate).isBetween(moment(bookingData.arrivalDate), moment(bookingData.departureDate))
    )
    .map(booking => booking.roomId.toString());

  return bookedRoomsIds.filter(bookingId => bookingId === bookingData.roomId).length <= 0;
};

module.exports = {
  checkCanBooking,
};
