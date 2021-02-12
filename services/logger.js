const Connection = require('../utils/Connection')
const connection = new Connection()
const fs = require('fs')
const { getDate, getFileDate, isWeekend } = require('./date')

class Logger {
  logToDB(level, message) {
    const con = connection.create()
    if (typeof message !== 'string') {
      console.log('coverted')
      message = JSON.stringify(message)
    }
    var sql = `INSERT INTO logs (level, message, date) VALUES ('${level}', '${message}', now())`
    con.query(sql, function (erro, result) {
      if (erro) throw erro
      console.log('Inserted')
    })
    connection.close(con)
  }

  // Log To file
  logToFile(data) {
    if (typeof data !== 'string') {
      data.date = getDate()
      data = JSON.stringify(data)
    }

    fs.appendFile(
      'logs/assistant-log-' + getFileDate() + '.log',
      '\n' + data,
      function (err) {
        if (err) throw err
        console.log({ status: 'Successful' })
      },
    )

    // Script to determine weekend inorder to achieve logs
    isWeekend()
  }
}

module.exports = Logger
