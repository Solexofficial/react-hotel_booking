const express = require('express');
const Like = require('../models/Like');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const likes = await Like.find();
    res.status(200).send(likes);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

module.exports = router;
