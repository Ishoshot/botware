const express = require('express')
const app = express()
// const path = require('path')
const dotenv = require('dotenv')
// const uuidv4 = require('uuid')
const bearerToken = require('express-bearer-token')
const { checkToken } = require('./auth/CheckToken')
const { dispatch } = require('./services/dispatch')

const Connection = require('./utils/Connection')
const connection = new Connection()

const Logger = require('./services/logger')
const logger = new Logger()

dotenv.config()

app.set('view engine', 'ejs')
app.use(
  bearerToken({
    bodyKey: 'access_token',
    queryKey: 'access_token',
    headerKey: 'Bearer',
    reqKey: 'token',
    cookie: false, // by default is disabled
  }),
)
app.use(express.json())

// -------------------------------------------------------------------------------------

app.post('/middleware', function (req, res) {
  // Check for Token
  var tokenable = checkToken(req.token, res)
  if (tokenable) {
    return dispatch(req, res)
  }
})

var response = {
  CustomerId: '396012',
  AccountNumber: '3075666588',
  AccountName: 'JAMIU ISMAIL',
  AccountType: 'SAVINGS',
  ProductCode: 'SA301',
  Product: 'SAVINGS A/C-PERSONAL',
  AccountStatus: 'A',
  CurrencyCode: 'NGN',
  BranchCode: '375',
  Branch: 'ZURU BRANCH',
  BookBalance: 1600515.23,
  AvailableBalance: 1600115.23,
  LienAmount: 400,
  UnclearedBalance: 0,
  MobileNo: '2348031338899',
  Email: null,
  RelationshipManagerId: null,
  RequestId: '7d4558135efb4fedb524ba1a5127a093',
  ResponseCode: '00',
  ResponseMessage: 'Successful',
}

var last = {
  RequestId: 'Avaya236',
  ResponseCode: '00',
  ResponseMessage: 'Successful',
  IsSendSms: true,
  LastNTransactions: [
    {
      Amount: 2000.0,
      TransactionType: 'Debit',
      Currency: 'NGN',
      TransactionDate: '2019-07-17T00:00:00Z',
      Remarks: 'Transfer Via USSD',
    },
    {
      Amount: 5000.0,
      TransactionType: 'Credit',
      Currency: 'NGN',
      TransactionDate: '2020-07-17T00:00:00Z',
      Remarks: 'Transfer Via USSD',
    },
    {
      Amount: 8000.0,
      TransactionType: 'Credit',
      Currency: 'NGN',
      TransactionDate: '2020-07-17T00:00:00Z',
      Remarks: 'Transfer Via USSD',
    },
  ],
}

var resp = {
  Liens: [
    {
      AccountNumber: '2033721008',
      LienAmount: '13063680',
      LienReason: 'MIGRATED LIENS',
      LienDate: '07-01-2019',
      ExpiryDate: '31-12-2099',
    },
    {
      AccountNumber: '2033721008',
      LienAmount: '13063680',
      LienReason: 'MIGRATED LIENS',
      LienDate: '07-01-2019',
      ExpiryDate: '31-12-2099',
    },
  ],
  RequestId: '12222121',
  ResponseCode: '00',
  ResponseMessage: 'Successful',
}

var resp1 = {
  Liens: [],
  RequestId: '12222121',
  ResponseCode: '00',
  ResponseMessage: 'Successful',
}

var resp2 = {
  Liens: [],
  RequestId: '12222121',
  ResponseCode: '09',
  ResponseMessage: 'Invalid Account',
}

app.post('/lien', function (req, res) {
  if (req.body.AccountNumber == '1234567890') {
    return res.status(200).json(resp)
  } else if (req.body.AccountNumber == '1234567899') {
    return res.status(200).json(resp1)
  } else {
    return res.status(200).json(resp2)
  }
})

var first = {
  access_token:
    'idwau7382wqeu2woq wsakf3y2wqet6wqe8ew97r62wyrgdskjigoaszkfl;szf[safl[s]a[cs[pafkcsaDl;afcsuiafguszd6q7i8rufewksfnck',
  token_type: '',
  expires_in: 142536475675,
  userName: 'web@firstbanknigeria.com',
  ipaddress: '192.097.673.910',
  '.issued': 'Sun, 28 Jun 2020 09:07:10 GMT',
  '.expires': 'Sun, 12 Jul 2020 09:07:10 GMT',
}

app.post('/first', (req, res) => {
  return res.status(200).json(first)
})

app.post('/update', function (req, res) {
  // Check for Token
  return res.status(200).json(response)
})

app.post('/last-n', function (req, res) {
  // Check for Token
  return res.status(200).json(last)
})

// Display logs from DB to view
app.get('/', function (req, res) {
  con = connection.create()
  var sql = 'Select * from logs'
  con.query(sql, function (err, result) {
    if (err) throw err
    res.render('./pages/logs', { result })
  })
  con.end()
})

//PORT
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
