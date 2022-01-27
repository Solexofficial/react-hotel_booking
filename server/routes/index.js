const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/auth', require('./auth.routes'));
router.use('/review', require('./review.routes'));
router.use('/booking', require('./booking.routes'));
router.use('/room', require('./room.routes'));
router.use('/like', require('./like.routes'));
router.use('/user', require('./user.routes'));

module.exports = router;
