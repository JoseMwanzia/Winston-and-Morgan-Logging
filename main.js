const winston = require('winston');
const {combine, printf, colorize, align, errors, json, timestamp} = winston.format

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  };
  
// Logs to four diffrent files including uncaught exeptions and rejections
winston.loggers.add('logger',{
    levels: logLevels,
    level: 'info',
    format: combine(
        colorize(true),
        errors({stack: true}),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    defaultMeta: { service: 'logger-A-Service'},
    transports: [
        new winston.transports.File({
            filename: 'error/log'}),
        new winston.transports.File({
            filename: 'app-error.log',
            level: 'error',
          }),
        new winston.transports.Console(),
    ],
    exceptionHandlers: [
        new winston.transports.File({filename: 'exeption.log'})
    ],
    rejectionHandlers: [
        new winston.transports.File({filename: 'rejections.log'})
    ]
})

const logger = winston.loggers.get('logger')
logger.info('Info message');
// logger.error(new Error('This is error'));


// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//         format: combine(
//             colorize({all: true}),
//             timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
//             align(), 
//             printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
//         )
//     })) 
// }


// logger.error(new Error('An error'));

// throw new Error('An uncaught error!');
// logger.error('Error message');
// logger.warn('Warning message');

// const levels = {
    // fatal
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6
//   };



// Deletes logs after a specified time
// require('winston-daily-rotate-file')

// const fileRotateTransport = new winston.transports.DailyRotateFile({
//     filename: 'combined-%DATE%.log',
//     datePattern: 'YYYY-MM-DD',
//     maxFiles: '14d'
// })

// const rotationLogger = winston.createLogger({
//     level: 'info',
//     format: combine(timestamp(), json()),
//     transports: [fileRotateTransport]
// })

// rotationLogger.info('I am rotation')

// fileRotateTransport.on('new', (filename) => { console.log(`File creted: ${filename}`)});

// const childLogger = rotationLogger.child({requestId: 'r3ef67dhjwujhbvfrtsyud567uhbvwhgsgud37ydnif'})

// childLogger.info('I am roation')
