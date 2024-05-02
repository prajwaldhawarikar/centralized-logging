const { createLogger, format, transports } = require('winston');
const packageJson = require('../package.json');

const logger = createLogger({
  level: process.env.verbose ? 'verbose' : 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(
      (info) =>
        `${info.timestamp} ${info.service}  ${info.level}: ${info.message}`
    ),
    format.splat(),
    format.colorize({ all: true }),
    format.errors({ stack: true })
  ),
  defaultMeta: { service: `${packageJson.name}:v${packageJson.version}` },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/agent.log' }),
  ],
});

module.exports = logger;
