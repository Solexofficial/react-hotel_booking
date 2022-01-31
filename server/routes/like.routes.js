const express = require('express');
const Like = require('../models/Like');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth.middleware');

router.get('/', async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query;
    const likes = await Like.find({ [orderBy]: equalTo });
    res.status(200).send(likes);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const newLike = await Like.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).send(newLike);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

router.delete('/:likeId', auth, async (req, res) => {
  try {
    const { likeId } = req.params;
    const removedLike = await Like.findById(likeId);

    if (removedLike.userId.toString() === req.user._id) {
      await removedLike.remove();
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
