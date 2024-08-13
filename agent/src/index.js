const path = require('path');
const retry = require('retry');

const logger = require('./logger');
const logService = require('./log.service');
const FileChangeEmitter = require('./watcher');

// Take this as input
const filePath = path.join(__dirname + '../../../logs/access.log');
const namespace = 'foo-service';
const interval = 1000;
const maxRetries = 10;

const fileChangeEmitter = new FileChangeEmitter(filePath, interval);
fileChangeEmitter.execute();

function handleRetry(namespace, log, retryCount = 10) {
  const operation = retry.operation({
    retries: retryCount,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 60000,
  });

  operation.attempt((currentAttempt) => {
    client.sendLog({ log: logData }, (error, response) => {
      if (operation.retry(error)) {
        return;
      }

      if (error) {
        console.error('Failed to send log after multiple attempts:', error);
      } else {
        console.log('Log sent successfully:', response);
      }
    });
  });
}

function sendLog(namespace, log, retryCount = 0) {
  // TODO: Take max retry count and retry interval as input
  if (retryCount >= maxRetries) {
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

  const operation = retry.operation({
    retries: retryCount,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 60000,
  });

  operation.attempt((currentAttempt) => {
    client.sendLog({ log: logData }, (error, response) => {
      if (operation.retry(error)) {
        return;
      }

      if (error) {
        console.error('Failed to send log after multiple attempts:', error);
      } else {
        console.log('Log sent successfully:', response);
      }
    });
  });
}

logger.verbose(`started`);
logger.verbose(`watching: ${filePath}`);

fileChangeEmitter.on('append', async (data) => {
  if (data) {
    // Fix this..only sending one line: use stream
    const [log] = data.split(/\r\n|\r|\n/);
    if (log) {
      sendLogRetry(namespace, log);
    }
  }
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  // Handle cleanup and restart
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection:', reason);
  // Handle cleanup and restart
});
