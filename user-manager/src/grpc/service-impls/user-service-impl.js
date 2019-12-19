const grpcHelper = require('@zerocore/grpc-helper');
const userService = require('../../services/user-service');

exports.delete = async (call, callback) => {
  try {
    const user = await userService.delete(grpcHelper.analyzeRequest(call.request))

    callback(null, grpcHelper.makeReply(user))
  } catch (error) {
    callback(error)
  }
}

exports.update = async (call, callback) => {
  try {
    const data = await userService.update(grpcHelper.analyzeRequest(call.request))

    callback(null, grpcHelper.makeReply(data))
  } catch (error) {
    callback(error)
  }
}

exports.list = async (call, callback) => {
  try {
    const data = await userService.list(grpcHelper.analyzeRequest(call.request))

    callback(null, grpcHelper.makeReply(data))
  } catch (error) {
    callback(error)
  }
}


exports.create = async (call, callback) => {
  try {
    const data = await userService.create(grpcHelper.analyzeRequest(call.request))

    callback(null, grpcHelper.makeReply(data))
  } catch (error) {
    callback(error)
  }
}

