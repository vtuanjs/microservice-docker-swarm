const winston = require('winston');
const filename = 'logs/sys.log';
const { appConfig } = process;

function _printf(info) {
  let log = `[${appConfig.appName}] [${info.timestamp}] [${info.level}]: `;

  if (typeof info.message === 'string') { log += info.message; }

  if (info.details) { log += `\n  details: ${info.details}`; }

  if (info.stack) { log += `\n  details: ${info.stack}`; }

  if (info.message.details) { log += `\n  details: ${info.message.details}`; }

  if (info.message.stack) { log += `\n  details: ${info.message.stack}`; }

  return log;
}

let options = {
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(_printf)
  ),
  handleExceptions: true,
  exitOnError: false,
  level: 'info',
  transports: [new winston.transports.File({
    filename,
    level: 'info',
    maxsize: 5242880,
    maxFiles: 5
  }
  )]
};

if (process.appConfig.debug) {
  options.transports.push(new winston.transports.Console({
    colorize: true,
    timestamp: true,
    level: 'info'
  }));
}

let logger = winston.createLogger(options);

logger.stream = {
  write: function (message, encoding) {
    if (process.env.NODE_ENV != "test"){
      logger.info(message);
    }
  },
};

module.exports = logger;
