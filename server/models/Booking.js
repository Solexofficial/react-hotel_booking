const { Schema, model } = require('mongoose');

const schema = new Schema({
  adults: Number,
  babies: Number,
  children: Number,
  arrivalDate: Date,
  departureDate: Date,
  roomId: String,
  userId: String,
  totalPrice: Number,
});

module.exports = model('Booking', schema);
