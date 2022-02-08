const { Schema, model, SchemaTypes } = require('mongoose');

const schema = new Schema({
  adults: Number,
  babies: Number,
  children: Number,
  arrivalDate: Date,
  departureDate: Date,
  roomId: { type: SchemaTypes.ObjectId, ref: 'Room' },
  userId: { type: SchemaTypes.ObjectId, ref: 'User' },
  totalPrice: Number,
  expires_at: Number,
});

module.exports = model('Booking', schema);
