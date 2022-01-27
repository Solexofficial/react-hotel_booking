const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    reviewId: {
      type: String,
      ref: 'Review',
    },
    userId: {
      type: String,
      ref: 'User',
    },
  },
  {
    timestamps: { createdAt: 'created_at' },
  }
);

module.exports = model('Like', schema);
