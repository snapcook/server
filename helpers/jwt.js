const jwt = require('jsonwebtoken');

const secret = process.env.JWTSECRET;

function generateToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: '3d' });
}

function decodeToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { decodeToken, generateToken };
