const express = require('express');
const router = express.Router({ mergeParams: true });
const Room = require('../models/Room');
const auth = require('../middleware/auth.middleware');
const { filterRooms } = require('../utils/filterRooms');

router.get('/', async (req, res) => {
  const query = req.query;
  try {
    const rooms = await Room.find();
    if (Object.keys(query).length > 0) {
      const filteredRooms = await filterRooms(rooms, query);
      return res.status(200).send(filteredRooms);
    }

    res.status(200).send(rooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

router.get('/:roomId', async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findById(roomId);
    res.send(room);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

router.post('/:roomId', auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    const isBooked = room.bookings.some(booking => booking.toString() === req.body.bookings);

    if (isBooked) {
      const updatedRoom = await Room.findByIdAndUpdate(roomId, { $pull: req.body }, { new: true });
      res.send(updatedRoom);
    } else {
      const updatedRoom = await Room.findByIdAndUpdate(roomId, { $push: req.body }, { new: true });
      res.send(updatedRoom);
    }
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

router.patch('/:roomId', auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    const updatedRoom = await Room.findByIdAndUpdate(roomId, req.body, { new: true });
    res.send(updatedRoom);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

module.exports = router;
