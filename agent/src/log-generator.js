const crypto = require('crypto');

const generateRandomLog = () => {
  const sampleLogs = [
    {
      '@timestamp': '2024-04-23T12:56:55+05:30',
      level: 'DEBUG',
      message: 'first loop completed.',
    },
    {
      '@timestamp': '2024-04-23T12:56:57+05:30',
      level: 'WARN',
      message: 'variable not in use.',
    },
    {
      '@timestamp': '2024-04-24T17:01:42+05:30',
      level: 'ERROR',
      message: 'something happened in this execution.',
    },
  ];
  return sampleLogs[crypto.randomInt(0, sampleLogs.length)];
};

module.exports = generateRandomLog;
