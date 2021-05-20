import {
  createLogger,
  format,
  transports,
  config as winstonConfig,
} from 'winston'
import os from 'os'

interface StandardSyslog {
  [key: string]: any
}

/**
 * All log levels (using syslog levels)
 * emerg: 0,
 * alert: 1,
 * crit: 2,
 * error: 3,
 * warning: 4,
 * notice: 5,
 * info: 6,
 * debug: 7
 */
const logLevels = winstonConfig.syslog.levels

/**
 * Winston syslog has different keyword than the standard one,
 * we'll have to map it in format level.
 * We could change the levels to the standard one,
 * but we will have to change how we log too, for example, logger.err(...) instead of logger.error()
 * which will definitely confuse a lot of dev.
 *
 * https://en.wikipedia.org/wiki/Syslog#Severity_level
 */
const winstonSyslogToStandardSyslog: StandardSyslog = {
  emerg: 'emerg',
  alert: 'alert',
  crit: 'crit',
  error: 'err',
  warning: 'warning',
  notice: 'notice',
  info: 'info',
  debug: 'debug',
}

const logLevelMapper = format((info) => {
  // Inject log level number
  // eslint-disable-next-line no-param-reassign
  info.levelNo = logLevels[info.level]
  // Map winston syslog to standard syslog according to https://en.wikipedia.org/wiki/Syslog#Severity_level
  // eslint-disable-next-line no-param-reassign
  info.level = winstonSyslogToStandardSyslog[info.level]
  // Copy transformed level string into another key, because graylog will always override the key "level" to a number.
  // eslint-disable-next-line no-param-reassign
  info.levelStr = info.level
  return info
})

export const loggerFormat = {
  simple: format.combine(format.simple(), format.colorize({ all: true })),
  pretty: format.combine(
    // Normally `logger.error(error)` won't log anything.
    // If we use `logger.error(error.message, error)`, the error message will be duplicate by winston
    // Using this format.errors fixes this issue and enable us to just use `logger.error(error)`.
    format.errors({ stack: true }),
    format.prettyPrint({ depth: 3 }),
    format.colorize({ all: true }),
  ),
  json: format.combine(
    // add timestamp
    format.timestamp(),
    // add log level number
    logLevelMapper(),
    // format the errors as explained in local.format
    format.errors({ stack: true }),
    // convert the message into json format as requested by SA team
    format.json(),
  ),
}

const optionConfig = {
  default: {
    levels: logLevels,
    // Set minimum level, anything lower won't be logged,
    // which has to be one of "logLevels"
    level: process.env.LOG_LEVEL_MIN || 'debug',
    transports: [new transports.Console()],
  },
  local: {
    format: loggerFormat.pretty,
  },
  server: {
    // add process id and hostname to the info
    defaultMeta: { pid: process.pid, hostname: os.hostname() },
    format: loggerFormat.json,
  },
}

export const logger = createLogger({
  ...optionConfig.default,
  ...(process.env.APP_ENV === 'local'
    ? optionConfig.local
    : optionConfig.server),
})

export const loggerSimple = createLogger({
  ...optionConfig.default,
  ...(process.env.APP_ENV === 'local'
    ? { format: loggerFormat.simple }
    : optionConfig.server),
})

/**
 * A util function for getting a stack trace without an error
 */
export function getStackTrace(): string {
  return new Error()?.stack?.replace(/^Error[\r\n]+/, '') || ''
}
