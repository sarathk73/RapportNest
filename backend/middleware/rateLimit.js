const rateLimit = require('express-rate-limit');
const HttpError = require('../models/http-error');

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 5, 
  handler: (req, res, next) => {
    next(new HttpError('Too many attempts at this endpoint. Please try again after 1 minute.', 429));
  }
});

module.exports = authLimiter;
