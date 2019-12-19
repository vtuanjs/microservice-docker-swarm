const httpStatus = require('http-status-codes');
const helper = require('./helper');

/**
 *
 * @param {Express.Response} res
 * @param {object} err
 */
exports.replyFailure = (res, err) => {
  let _err = {};

  if (err.code) { _err.code = err.code; }

  if (err.details) { _err.details = err.details; }

  if (!err.status) { err.status = helper.toHTTPStatus(err.code); }

  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json(_err);
}

/**
 *
 * @param {Express.Response} res
 * @param {*} data
 * @param {number} status
 */
exports.reply = (res, data, status = httpStatus.OK) => {
  res.status(status).json(data);
};