const express = require('express');
const router = express.Router({ mergeParams: true });
const Room = require('../models/Room');

router.get('/', async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    let rooms = await Room.find({ ...query });
    if (query.price) {
      rooms = await Room.find({ price: { $gte: query.price[0], $lte: query.price[1] } });
      // return res.status(200).send(rooms);
    }
    res.status(200).send(rooms);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

module.exports = router;
