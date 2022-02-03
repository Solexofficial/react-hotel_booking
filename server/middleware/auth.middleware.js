const User = require('../models/User');
const tokenService = require('../services/token.service');

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const data = tokenService.validateAccess(token);
    const currentUserData = await User.findById(data);

    req.user = data;
    req.userRole = currentUserData.role;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
    });
  }
};
