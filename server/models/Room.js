const { Schema, model } = require('mongoose');

const schema = new Schema({
  roomNumber: Number,
  price: Number,
  countReviews: Number,
  rate: Number,
  canSmoke: Boolean,
  images: Object,
  comforts: [String],
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  type: { type: String, enum: ['Стандарт', 'Люкс'] },
});

module.exports = model('Room', schema);
