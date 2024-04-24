const { loadProtoPackage } = require('./proto-loader');
const { startServer } = require('./server');

const { sendLog } = require('./log');

const protoPackage = loadProtoPackage();

startServer((err, server) => {
  if (err) {
    console.log(err);
    throw err;
  }
  // register service
  server.addService(protoPackage.log.LogService.service, { sendLog });

  console.log('Server started');
});
