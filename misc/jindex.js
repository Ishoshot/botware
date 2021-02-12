let type = req.body.activity
if (type == 'entrust_request') {
  var account_no = req.body.account_no
}

// Request to be Logged
var uniqueID = uuidv4.v4()
let request = { id: uniqueID, type: 'Incoming', ...req.body }

// Logging
logger.logToDB('info', request)
logger.logToFile(request)

// Stimulating Response
var response = {
  message: { key: 'value' },
}
response = { id: uniqueID, type: 'Outgoing', ...response }

//Logging Response with same uniqueID
logger.logToFile(response)

// Send Response to Bot
return res.json({
  message: account_no,
  data: 'You dae Mad',
  token: req.token,
})
