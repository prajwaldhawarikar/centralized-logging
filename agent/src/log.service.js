const path = require('path');

const protoLoader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');

const PROTO_PATH = path.join(__dirname, '../protos/log.proto');

class LogService {
  constructor() {
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    const protoPackage = grpc.loadPackageDefinition(packageDefinition);

    // TODO: Read the host from env vars or input
    this.client = new protoPackage.log.LogService(
      'localhost:50051',
      grpc.credentials.createInsecure()
    );
  }
}

module.exports = new LogService();
