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

    this.client = new protoPackage.log.LogService(
      'localhost:50051',
      grpc.credentials.createInsecure()
    );
  }
  sendLog(namespace, log) {
    // TODO: Have retry logic
    this.client.sendLog({ namespace, data: log }, (err, res) => {
      if (err) {
        console.log(response);
      } else {
        console.log(res);
      }
    });
  }
}

module.exports = new LogService();
