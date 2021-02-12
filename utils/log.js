const uuidv4 = require('uuid')
const Logger = require('../services/logger')
const logger = new Logger()

module.exports = {
  log: (req) => {
    // Request to be Logged
    var uniqueID = uuidv4.v4()
    let request = { id: uniqueID, type: 'Incoming', ...req.body }

    // Logging
    logger.logToDB('info', request)
    logger.logToFile(request)
  },
}
