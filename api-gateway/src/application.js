const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./logger');
const winston = require('./logger/winston-logger');
const apiHelper = require('./api-helper');
const apis = require('../configs/api.json');
const httpStatus = require('http-status-codes');
const app = express();
const { appConfig } = process;

app.use(express.json({ limit: '50MB' }));

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(morgan('combined', { stream: winston.stream }));

for (const v of apis) {
  for (const api of v.apis) {
    let handlers = loadHandlers(v, api);

    switch (api.method.toLocaleLowerCase()) {
      case 'get': {
        app.get(`${v.basePath}${api.path}`, ...handlers);
        break;
      }
      case 'post': {
        app.post(`${v.basePath}${api.path}`, ...handlers);
        break;
      }
      case 'put': {
        app.put(`${v.basePath}${api.path}`, ...handlers);
        break;
      }
      case 'delete': {
        app.delete(`${v.basePath}${api.path}`, ...handlers);
        break;
      }
      default:
        break;
    }
  }

  app.use(v.basePath, require(`.${v.resource}`));
}

app.use((req, res, next) => {
  apiHelper.replyFailure(res, {
    status: httpStatus.NOT_FOUND,
    details: 'Not found path'
  });
});

app.use((err, req, res, next) => {
  apiHelper.replyFailure(res, {
    status: httpStatus.INTERNAL_SERVER_ERROR,
    details: 'An unknown error has occurred'
  });

  logger.error(err);
});

function start() {
 return app.listen(appConfig.port, () => {
    logger.info(`App listening on port ${appConfig.port}`);
  });
}

/**
 *
 * @param {object} v
 * @param {object} api
 * @returns {(req, res, next){}[]}
 */
function loadHandlers(v, api) {
  let handlers = [];

  if (api.auth === 'jwt') {
    // add authenticate middleware
  }
  let roles = [];

  if (v.roles) {
    if (Array.isArray(v.roles)) {
      roles = [...roles, ...v.roles];
    } else {
      let error = new Error(`Invalid general roles in api.json at resource "${v.resource}"`);
      throw error;
    }
  }

  if (api.roles) {
    if (Array.isArray(api.roles)) {
      roles = [...roles, ...api.roles];
    } else {
      let error = new Error(`Invalid roles in api.json at resource "${v.resource}", basePath "${api.basePath}" ,path "${api.path}"`);
      throw error;
    }
  }

  handlers.push(permit(Array.from(new Set(roles))));
  return handlers;
}

/**
 *
 * @param {string[]} beAllowed
 * @param {string[]} roles
 */
function permit(beAllowed, roles = []) {
  return (req, res, next) => {
    if (beAllowed.includes('Anyone')) { return next(); }

    // if (req.jwt.roles) {
    //   roles = Array.from(new Set([...roles, ...req.jwt.roles]))
    // }

    // for (const role of roles) {
    //   if (beAllowed.includes(role)) { return next(); }
    // }

    apiHelper.replyFailure(res, {
      status: httpStatus.FORBIDDEN,
      details: 'Access is not allowed'
    });
    return;
  }
}

module.exports = Object.assign({ start }, app);