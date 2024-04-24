const path = require('path');

const protoLoader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');

const PROTO_PATH = path.join(__dirname, '../protos/log.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const loadProtoPackage = () => grpc.loadPackageDefinition(packageDefinition);

module.exports = { loadProtoPackage };
