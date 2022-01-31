const express = require('express');
const Review = require('../models/Review');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query;
    const reviews = await Review.find({ [orderBy]: equalTo });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      userId: req.user_id,
    });
    res.status(201).send(newReview);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

router.delete('/:reviewId', auth, (req, res) => {
  try {
    const { reviewId } = req.params;
    const removedReview = await Review.findById(reviewId);

    if (removedReview.userId.toString() === req.user._id) {
      await removedReview.remove();
      return res.send(null);
    } else {
      res.status(401).json({
        message: 'Unauthorized',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

module.exports = router;
