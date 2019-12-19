require('../src/configurator').load();

const logger = require('./logger');
const mongodb = require('./mongodb');
const grpcServer = require('./grpc/server');
const { appConfig } = process;

process.on('exit', (code) => {
  logger.warn(`Process ${process.pid} exit with code ${code}`);
});

process.on('uncaughtException', (error) => { });

/**
 * Launch program
 */
exports.start = () => {
  mongodb.connect()
    .then(mongosse => {
      grpcServer.start();
      logger.info(`The gRPC server started on ${appConfig.address}:${appConfig.port}`);
    })
    .catch(error => {
      throw error;
    });
}