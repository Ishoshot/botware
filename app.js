const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())

/* ------------------------------- Validations ------------------------------ */
const {
  accountNumber,
  serialNumber,
  userID,
} = require('./validation/validation')

function validateAccountNumber(req, res) {
  if (!req.body.AccountNumber || req.body.AccountNumber === '') {
    return res.status(200).json(accountNumber)
  }
  if (req.body.AccountNumber.length < 10) {
    accountNumber.message = 'Please Provide a Valid Account Number'
    return res.status(200).json(accountNumber)
  }
}

function validateUserID(req, res) {
  if (!req.body.UserID || req.body.UserID === '') {
    return res.status(200).json(userID)
  }
}

function validateSerialNumber(req, res) {
  if (!req.body.SerialNumber || req.body.SerialNumber === '') {
    return res.status(200).json(serialNumber)
  }
}

/* ----------------------------- Validate Token ----------------------------- */

const { tokenResponse, tokenResponseErr } = require('./responses/validateToken')

app.post('/api/validate/token', (req, res) => {
  if (req.body.TokenCode === '1122334455') {
    return res.status(200).json(tokenResponse)
  } else {
    return res.status(200).json(tokenResponseErr)
  }
})

/* -------------------------------------------------------------------------- */
/*                               Account Enquiry                              */
/* -------------------------------------------------------------------------- */
const {
  accountBVNResponse,
  accountLienResponse,
  accountUpdateResponse,
  balanceEnquiryResponse,
  accountFreezeResponse,
  reversalCheckResponse,
  transactionCheckResponse,
} = require('./responses/accountEnquiry')

/* ----------------------------- Account BVN ----------------------------- */

app.post('/api/enquiry/bvn', (req, res) => {
  validateAccountNumber(req, res)
  let message = `The BVN linked with Account Number: ${req.body.AccountNumber} is 0055627291789`
  accountBVNResponse.message = message
  return res.status(200).json(accountBVNResponse)
})

/* ----------------------------- Account Lien ----------------------------- */

app.post('/api/enquiry/lien', (req, res) => {
  validateAccountNumber(req, res)
  return res.status(200).json(accountLienResponse)
})

/* ----------------------------- Account Update ----------------------------- */

app.post('/api/enquiry/update', (req, res) => {
  validateAccountNumber(req, res)
  return res.status(200).json(accountUpdateResponse)
})

/* ----------------------------- Balance Enquiry --------------------------- */

app.post('/api/enquiry/balance', (req, res) => {
  validateAccountNumber(req, res)
  return res.status(200).json(balanceEnquiryResponse)
})

/* ----------------------------- Account Freeze ----------------------------- */

app.post('/api/enquiry/freeze', (req, res) => {
  validateAccountNumber(req, res)
  let message = `Please be Advised that there is a Credit Freeze on Account Number: ${req.body.AccountNumber}`
  accountFreezeResponse.message = message
  return res.status(200).json(accountFreezeResponse)
})

/* ----------------------------- Reversal Check ----------------------------- */

app.post('/api/enquiry/reversal', (req, res) => {
  validateAccountNumber(req, res)
  return res.status(200).json(reversalCheckResponse)
})

/* ----------------------------- Transaction Check ----------------------------- */

app.post('/api/enquiry/transaction-check', (req, res) => {
  validateAccountNumber(req, res)
  return res.status(200).json(transactionCheckResponse)
})

/* -------------------------------------------------------------------------- */
/*                                   Entrust                                  */
/* -------------------------------------------------------------------------- */

const {
  lockTokenResponse,
  unlockTokenResponse,
  statusEnquiryResponse,
} = require('./responses/entrust')

/* ----------------------------- Lock Token ----------------------------- */

app.post('/api/entrust/lock-token', (req, res) => {
  validateUserID(req, res)
  return res.status(200).json(lockTokenResponse)
})

/* ----------------------------- unlock Token --------------------------- */

app.post('/api/entrust/unlock-token', (req, res) => {
  validateSerialNumber(req, res)
  return res.status(200).json(unlockTokenResponse)
})

/* ----------------------------- Status Enquiry --------------------------- */

app.post('/api/entrust/enquiry', (req, res) => {
  validateUserID(req, res)
  return res.status(200).json(statusEnquiryResponse)
})

/* -------------------------------------------------------------------------- */
/*                                   E-Statement                              */
/* -------------------------------------------------------------------------- */

const { statementResponse } = require('./responses/e-statement')

/* ----------------------------- Send Statement ----------------------------- */

app.post('/api/send-statement', (req, res) => {
  validateAccountNumber(req, res)
  const message = `A PDF versioned Statement has been sent to the E-mail Address registered with Account Number: ${req.body.AccountNumber}`
  statementResponse.message = message
  return res.status(200).json(statementResponse)
})

/* -------------------------------------------------------------------------- */
/*                                   Digital Loan                              */
/* -------------------------------------------------------------------------- */

const { digitalLoanResponse } = require('./responses/digital-loan')

/* ----------------------------- Send Statement ----------------------------- */

app.post('/api/digital-loan', (req, res) => {
  validateAccountNumber(req, res)
  return res.status(200).json(digitalLoanResponse)
})

/* -------------------------------------------------------------------------- */
/*                                   Log Case                              */
/* -------------------------------------------------------------------------- */

const { logCaseResponse } = require('./responses/logcase')

/* ----------------------------- Log Case ----------------------------- */

app.post('/api/log-case', (req, res) => {
  validateAccountNumber(req, res)
  const message = `Case Successfully Created for ${req.body.AccountNumber}. Tracking Number: FBN-09022150609`
  logCaseResponse.message = message
  return res.status(200).json(logCaseResponse)
})

/* ---------------------------------- PORT ---------------------------------- */

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
