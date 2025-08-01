const logger = require('../logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
