const { Schema, model } = require('mongoose');

const schema = new Schema({
  firstName: String,
  secondName: String,
  subscribe: Boolean,
  birthYear: Number,
  avatarPhoto: String,
  password: String,
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['male', 'female'] },
});

module.exports = model('User', schema);
