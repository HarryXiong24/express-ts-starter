import { Logger, LoggerOptions, transports } from 'winston';

const options: LoggerOptions = {
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    }),
  ],
};

export const logger = new Logger(options);

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;