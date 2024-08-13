const fs = require('fs');
const { EventEmitter } = require('events');
const logger = require('./logger');

const exitOnError = (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
};

class FileChangeEmitter extends EventEmitter {
  constructor(filePath, interval) {
    super();
    this.filePath = filePath;
    this.interval = interval;
  }

  execute() {
    fs.open(this.filePath, 'r', (err, fd) => {
      exitOnError(err);

      fs.watchFile(this.filePath, { interval: 1000 }, (curr, prev) => {
        const sizeDiff = curr.size - prev.size;

        if (sizeDiff > 0) {
          const buffer = Buffer.alloc(sizeDiff);

          fs.read(fd, buffer, 0, sizeDiff, prev.size, (err) => {
            exitOnError(err);

            this.emit('append', buffer.toString());
          });
        }
      });
    });
  }
}

module.exports = FileChangeEmitter;
