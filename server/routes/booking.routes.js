const express = require('express');
const { checkCanBooking } = require('../utils/checkCanBooking');
const Booking = require('../models/Booking');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth.middleware');

router.get('/', async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query;
    const bookings = await Booking.find({ [orderBy]: equalTo });
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const canBooking = await checkCanBooking(req.body);
    if (canBooking) {
      const newBooking = await Booking.create({
        ...req.body,
        userId: req.user._id,
        expires_at: req.body.departureDate - req.body.arrivalDate,
      });

      res.status(201).send(newBooking);
    } else {
      res.status(400).send({
        error: {
          message: 'BOOKING_EXIST',
          code: 400,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

router.delete('/:bookingId', auth, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const removedBooking = await Booking.findById(bookingId);
    const isAdmin = req.userRole === 'admin';
    const currentUser = removedBooking.userId.toString() === req.user._id;

    if (currentUser || isAdmin) {
      await removedBooking.remove();
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
