require('../../src/configurator').load();//load configuration (env) when debugging use vscode
const path = require('path');
const grpc = require('grpc');
const grpcHelper = require('@zerocore/grpc-helper');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = path.join(__dirname, '../../src/grpc/protos/product-manager.proto');
const { appConfig } = process;

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
let client = new protoDescriptor.ProductManager(
  `${appConfig.address}:${appConfig.port}`, grpc.credentials.createInsecure()
);

module.exports = grpcHelper.createClient(client);