const { Schema, model } = require('mongoose');

const schema = new Schema({
  firstName: String,
  secondName: String,
  subscribe: Boolean,
  birthYear: Number,
  avatarPhoto: String,
  password: String,
  role: { type: String, enum: ['user', 'admin'] },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['male', 'female'] },
});

module.exports = model('User', schema);
