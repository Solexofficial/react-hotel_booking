const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const config = require('config');

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get('ACCESS_SECRET'), {
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign(payload, config.get('REFRESH_SECRET'));

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600,
    };
  }

  async save(userId, refreshToken) {
    const data = await Token.findOne({ user: userId });
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get('REFRESH_SECRET'));
    } catch (error) {
      return null;
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get('ACCESS_SECRET'));
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
