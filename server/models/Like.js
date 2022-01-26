const { Schema, model } = require('mongoose');

const schema = new Schema({
  reviewId: {
    type: String,
    ref: 'Review',
  },
  userId: {
    type: String,
    ref: 'User',
  },
});

module.exports = model('Like', schema);
