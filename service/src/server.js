const grpc = require('@grpc/grpc-js');

const server = new grpc.Server();

const startServer = (callback) => {
  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    (err) => {
      callback(err, server);
    }
  );
};

module.exports = { startServer };
