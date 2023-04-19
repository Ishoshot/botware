const express = require('express')
const app = express()
const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config()
app.use(express.json())

const { openai, routeRequest } = require('./services/openai/openai')

/* ------------------------------- Validations ------------------------------ */
const {
  accountNumber,
  serialNumber,
  userID,
  Prompt
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

function validatePrompt(req, res) {
  if (!req.body.Prompt || req.body.Prompt === '') {
    return res.status(200).json(Prompt)
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

app.post('/api/enquiry/balance', async (req, res) => {
  // validateAccountNumber(req, res)
  validatePrompt(req, res)
  const response = await routeRequest(req, res);
  if (response.code == '05') {
    return res.status(500).json(response);
  }
  //remove 'Response: ' from response.text
  const params = response.data.text.replace('Response: ', '');
  balanceEnquiryResponse.message = `${JSON.parse(params).AccountNumber}: ${balanceEnquiryResponse.message}`
  return res.status(200).json(balanceEnquiryResponse);

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
  const message = `Case Successfully Created for ${req.body.AccountNumber}. Tracking Number: dDL-09022150609`
  logCaseResponse.message = message
  return res.status(200).json(logCaseResponse)
})

app.get('/test', (req, res) => {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMmVjN2JlMTFjZjdmYjk4ZTZkM2Q1NzI1NDIxZDc5Nzk1ZmZjNjc5ZTRmZTUxMTUwNGVmMzM2MmE5ZDg5NmI3ZjllZTA2MTIzMWM1M2Q0M2YiLCJpYXQiOjE2MjM1Nzk5OTUsIm5iZiI6MTYyMzU3OTk5NSwiZXhwIjoxNjU1MTE1OTk1LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.PVol0fiX1VVuBkWINn5-lx2oEYB22h6CuiUmvLHou91sbO3MLNiT6HruI2MtTiAZAa_3R5uAmFJjSA51xJQ4lpWZdZsjUAWekemCmfI8zkFjXucAHqqIAZBBr4buJbKNU79wPH79i632R0JDy-o8XQfxNaWLgktkYysIntoiNE1cqITuQ2SvG0XJ_DOpvivmOd968phlVVB4IAArSr6TNM-F-4t5H8r9rVIbXxygejDbWZgQ3_31LAF97oWqJZQ9aIb-twiYP1lQAylzQTIT9yziwVEhgC6ZAAKd7jreC68I6XcVfO-d_KdmxKjb56vR5ObmtzOLp70Zd3oHjWFmOZ-8UfbvzNQdxZ3KsQJGBbVGDaGFR7Ib8WHIbiYnrKQvuhnLNr4hp137uKvxwdxlai0fI4CALc7hQ7OTUaorQ0iTxMNqg91VeRizdGNvk_S7ABvrEHmusYUh0262umm2g4gtnxHDYd5mF57YMNDXMlFZpk0k10B1kYSVdvFP_24XEbmWXt4Ih8aJBQbTpHBMyuu443x2CqEv_6Jn8cSCeTRU-oAAt62FsOphU9BafmDyLla_X9PvjB-hx5N-V3X_Pn5theIYpi_t2Y-QBUjAydakPNVL4kT6hjnEGphWk9tC4Tc70BrfzMAUK8o7BIY3gM5t1v4qbPhih2deMifC6vY'
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  axios
    .get(
      'https://dipolediamond.spark.processmaker.net/api/1.0/collections/12/records',
      config,
    )
    .then((res) => console.log(res.data.data))
    .catch((err) => console.log(err))
})

/* ---------------------------------- PORT ---------------------------------- */

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
