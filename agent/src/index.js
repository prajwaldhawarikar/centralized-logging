const path = require('path');
const logService = require('./log.service');
const FileChangeEmitter = require('./watcher');

// Take this as input
const filePath = path.join(__dirname + '../../../logs/access.log');
const namespace = 'foo-service';
const interval = 1000;

const fileChangeEmitter = new FileChangeEmitter(filePath, interval);
fileChangeEmitter.execute();

fileChangeEmitter.on('append', async (data) => {
  console.log(data);
  if (data) {
    // Fix this..only sending one line: use stream
    const [log] = data.split(/\r\n|\r|\n/);
    if (log) {
      logService.client.sendLog({ namespace, data: log }, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      });
    }
  }
});
