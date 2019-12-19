const winstonLogger = require('./winston-logger');

exports.info = (message) => { winstonLogger.info(message); }

exports.warn = (message) => { winstonLogger.warn(message); }

exports.error = (err) => { winstonLogger.error(err); }