const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const logFilePath = path.join(__dirname, 'access.log');

morgan.token('timestamp', () => new Date().toUTCString());

const customFormat = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length') || 0,
    tokens['response-time'](req, res) + ' ms',
    tokens.timestamp(req, res),
    `HTTP/${tokens['http-version'](req, res)}`,
    tokens.url(req, res)
  ].join(' ') + '\n';
};

const accessLogStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const logger = morgan(customFormat, { stream: accessLogStream });

module.exports = logger;