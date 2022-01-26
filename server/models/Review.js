const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    rating: Number,
    roomId: {
      type: String,
      ref: 'Room',
      required: true,
    },
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
    created_at: String,
  },
  {
    timestamps: { createdAt: 'created_at' },
  }
);

module.exports = model('Review', schema);
