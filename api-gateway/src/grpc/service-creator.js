const path = require('path');
const grpc = require('grpc');
const grpcHelper = require('@zerocore/grpc-helper');
let protoLoader = require('@grpc/proto-loader');
const protosDir = path.join(__dirname, '../grpc/protos');
let userManagerIntance = null;
let productManagerIntance = null;

exports.create = (service) => {
  let PROTO_PATH;

  switch (service) {
    case 'UserManager': {
      if (typeof userManagerIntance === 'object' && userManagerIntance) {
        return userManagerIntance;
      }

      PROTO_PATH = path.join(protosDir, 'user-manager.proto');
      break;
    }
    case 'ProductManager': {
      if (typeof productManagerIntance === 'object' && productManagerIntance) {
        return productManagerIntance;
      }

      PROTO_PATH = path.join(protosDir, 'product-manager.proto');
      break;
    }
    default:
      break;
  }

  const register = require('../../configs/register.json')[service];
  let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });
  let protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
  let client = new protoDescriptor[service](
    `${register.address}:${register.port}`, grpc.credentials.createInsecure()
  );

  return grpcHelper.createClient(client);
}