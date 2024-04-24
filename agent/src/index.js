const logService = require('./log.service');
const generateRandomLog = require('./log-generator');

logService.sendLog('foo-service', JSON.stringify(generateRandomLog()));
