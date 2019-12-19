const mongoose = require('mongoose');
const logger = require('./logger');
const { appConfig } = process;

exports.connect = () => {
  return mongoose.connect(appConfig.mongodb_connection_string, {
    user: appConfig.mongodb_user_name,
    pass: appConfig.mongodb_password,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify : false
  });
}

mongoose.connection.on('error', (err) => {
  logger.error(err);
  throw err;
});

mongoose.connection.once('connected', () => {
  logger.info('Mongodb connected');
});

mongoose.connection.once('disconnected', () => {
  logger.warn('Mongodb disconnected');
});