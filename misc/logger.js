const { createLogger, transports, format } = require('winston')
require('winston-mongodb')
const dotenv = require('dotenv')
dotenv.config()
// const mongoose = require('mongoose');

// // const datab = () => mongoose.connect(process.env.DB);

const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'log/info.log',
      // level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.MongoDB({
      level: 'error',
      db: process.env.DB,
      collection: 'logs',
      format: format.combine(
        format.timestamp(),
        format.label({ label: 'ejf' }),
      ),
    }),
  ],
})

module.exports = logger
