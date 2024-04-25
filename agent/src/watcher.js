const fs = require('fs');
const { EventEmitter } = require('events');

class FileChangeEmitter extends EventEmitter {
  constructor(filePath, interval) {
    super();
    this.filePath = filePath;
    this.interval = interval;
  }

  execute() {
    const fd = fs.openSync(this.filePath, 'r');
    fs.watchFile(this.filePath, { interval: 1000 }, (curr, prev) => {
      const sizeDiff = curr.size - prev.size;

      if (sizeDiff > 0) {
        const buffer = Buffer.alloc(sizeDiff);
        fs.read(fd, buffer, 0, sizeDiff, prev.size, (err) => {
          if (err) {
            console.log(err);
          } else {
            this.emit('append', buffer.toString());
          }
        });
      }
    });
  }
}

module.exports = FileChangeEmitter;
