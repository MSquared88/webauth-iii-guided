const jwt = require('jsonwebtoken');

const secret = require('../config/secrets')

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token  = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
      else {
        req.username = decodedToken.username
        next();
      }
    })
  } 
  else {
    res.status(400).json({ message: 'No token provided' });
  }
};
