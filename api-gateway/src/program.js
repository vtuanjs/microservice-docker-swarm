require('../src/configurator').load();
process.appConfig.appName = 'API Gateway';

const logger = require('./logger');
const application = require('./application');

process.on('exit', (code) => {
  logger.warn(`Process ${process.pid} exit with code ${code}`);
});

process.on('uncaughtException', (error) => { });

/**
 * Launch program
 */
exports.start = () => {
  application.start();
}