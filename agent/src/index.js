const path = require('path');

const logger = require('./logger');
const logService = require('./log.service');
const FileChangeEmitter = require('./watcher');

// Take this as input
const filePath = path.join(__dirname + '../../../logs/access.log');
const namespace = 'foo-service';
const interval = 1000;

const fileChangeEmitter = new FileChangeEmitter(filePath, interval);
fileChangeEmitter.execute();

function sendLogRetry(namespace, log, retryCount = 0) {
  // TODO: Take max retry count and retry interval as input
  if (retryCount >= 10) {
    logger.error('Retry limit reached. Failed to send logs after 10 attempts.');
    return;
  }

  logService.client.sendLog({ namespace, data: log }, (err, res) => {
    if (err) {
      logger.error(err);
      logger.verbose(`Retrying... Attempt ${retryCount + 1}`);
      sendLogRetry(namespace, log, retryCount + 1);
    } else {
      logger.verbose(JSON.stringify(res));
    }
  });
}

fileChangeEmitter.on('append', async (data) => {
  if (data) {
    // Fix this..only sending one line: use stream
    const [log] = data.split(/\r\n|\r|\n/);
    if (log) {
      sendLogRetry(namespace, log);
    }
  }
});
