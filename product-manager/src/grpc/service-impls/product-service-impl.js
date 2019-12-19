const grpcHelper = require('@zerocore/grpc-helper');
const productService = require('../../services/product-service');

exports.delete = async (call, callback) => {
  try {
    const product = await productService.delete(grpcHelper.analyzeRequest(call.request))

    callback(null, grpcHelper.makeReply(product))
  } catch (error) {
    callback(error)
  }
}

exports.update = async (call, callback) => {
  try {
    const data = await productService.update(grpcHelper.analyzeRequest(call.request))

    callback(null, grpcHelper.makeReply(data))
  } catch (error) {
    callback(error)
  }
}

exports.list = async (call, callback) => {
  try {
    const data = await productService.list(grpcHelper.analyzeRequest(call.request))

    callback(null, grpcHelper.makeReply(data))
  } catch (error) {
    callback(error)
  }
}


exports.create = async (call, callback) => {
  try {
    const data = await productService.create(grpcHelper.analyzeRequest(call.request))

    callback(null, grpcHelper.makeReply(data))
  } catch (error) {
    callback(error)
  }
}

