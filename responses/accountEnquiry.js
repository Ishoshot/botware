/* -------------------------------------------------------------------------- */
/*                                 Account BVN                                */
/* -------------------------------------------------------------------------- */

const accountBVN = {
  code: '00',
  message: '',
  otherMessage: '',
}

/* -------------------------------------------------------------------------- */
/*                                 Account Lien                                */
/* -------------------------------------------------------------------------- */
const accountLienData = {
  Liens: [
    {
      AccountNumber: '3113774921',
      LienAmount: '998700',
      LienReason: 'MASTERCARD DEBIT BLOCK FUNDS',
      Initiator: 'SYSTEM',
      Verifier: 'SYSTEM',
      BranchCode: '111',
      LienDate: '2019-07-12T00:00:00Z',
      ExpiryDate: '2019-08-11T00:00:00Z',
    },
    {
      AccountNumber: '3113774921',
      LienAmount: '324400',
      LienReason: 'MASTERCARD DEBIT BLOCK FUNDS',
      Initiator: 'CDCI',
      Verifier: 'CDCI',
      BranchCode: '111',
      LienDate: '2019-07-15T00:00:00Z',
      ExpiryDate: '2099-04-01T00:00:00Z',
    },
    {
      AccountNumber: '3113774921',
      LienAmount: '70088',
      LienReason: 'MASTERCARD DEBIT BLOCK FUNDS',
      Initiator: 'CDCI',
      Verifier: 'CDCI',
      BranchCode: '111',
      LienDate: '2019-07-15T00:00:00Z',
      ExpiryDate: '2099-04-01T00:00:00Z',
    },
  ],
  RequestId: '20200930140715729',
  ResponseCode: '00',
}

const accountLien = {
  code: '00',
  message: JSON.stringify(accountLienData),
  otherMessage: '',
}

/* -------------------------------------------------------------------------- */
/*                                 Account Update                             */
/* -------------------------------------------------------------------------- */
const accountUpdateData = {
  CustomerId: '6021106',
  AccountNumber: '3125647785',
  AccountName: 'ODETOYINBO AKINBOLA DIPO',
  AccountType: 'SAVINGS',
  ProductCode: 'SA321',
  Product: 'FIRST INSTANT ACCOUNT',
  AccountStatus: 'A',
  FreezeCode: ' ',
  CurrencyCode: 'NGN',
  BranchCode: '230',
  Branch: 'MARINA BRANCH',
  BookBalance: 41311.9,
  AvailableBalance: 41311.9,
  Liens: 0,
  UnclearedBalance: 0.0,
  MobileNo: '2347065729887',
  Email: 'odetakin@gmail.com',
  Address: null,
  DateOfBirth: null,
  RelationshipManagerId: 'SN021214',
  RequestId: '20210203121214546',
  ResponseCode: '00',
  ResponseMessage: 'Successful',
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

const accountUpdate = {
  code: '00',
  message: accountUpdateData,
  otherMessage: '',
}

/* -------------------------------------------------------------------------- */
/*                                 Balance Enquiry                            */
/* -------------------------------------------------------------------------- */

const balanceEnquiry = {
  code: '00',
  message:
    'Your Available Balance is 345,656.00 NGN, Book Balance: 762,792.00 NGN',
  otherMessage: '',
}

/* -------------------------------------------------------------------------- */
/*                                 Account Freeze                                */
/* -------------------------------------------------------------------------- */

const accountFreeze = {
  code: '00',
  message: '',
  otherMessage: '',
}

/* -------------------------------------------------------------------------- */
/*                                 Reversal Check                                */
/* -------------------------------------------------------------------------- */

const reversalCheckData = {
  ReversedTransactions: [
    {
      TransactionId: 'S41208089',
      TransactionDate: '7/22/2019 12:00:00 AM',
      Amount: '25600',
      Narration: 'QS894:101300001882451091/2347083909032',
      ValueDate: '7/21/2019 12:00:00 AM',
      Reference: '452629525501',
      SolId: '230',
      TransactionRemarks: '452629525501',
    },

    {
      TransactionId: 'S41208089',
      TransactionDate: '7/22/2019 12:00:00 AM',
      Amount: '240',
      Narration: 'QS894:101300001882451091/2347083909032',
      ValueDate: '7/21/2019 12:00:00 AM',
      Reference: '452629525501',
      SolId: '230',
      TransactionRemarks: '452629525501',
    },

    {
      TransactionId: 'S41208089',
      TransactionDate: '7/22/2019 12:00:00 AM',
      Amount: '2000',
      Narration: 'QS894:101300001882451091/2347083909032',
      ValueDate: '7/21/2019 12:00:00 AM',
      Reference: '452629525501',
      SolId: '230',
      TransactionRemarks: '452629525501',
    },
  ],
  ResponseCode: '00',
  ResponseMessage: 'Successful',
}

const reversalCheck = {
  code: '00',
  message: JSON.stringify(reversalCheckData),
  otherMessage: '',
}

/* -------------------------------------------------------------------------- */
/*                                 Transaction Check                          */
/* -------------------------------------------------------------------------- */

const transactionCheckData = {
  Transactions: [
    {
      TransactionId: 'S40871551',
      PartTranType: 'D',
      TransactionAmount: '6900.0',
      Narration: 'BAP:CD/FM-140455110387108515-F63/DSTV/Co',
      TransactionRemarks: '376229040698',
      ReferenceNumber: '376229040698',
      ValueDate: '7/21/2019 12:00:00 AM',
      TransactionRemarks2: 'PTB:8310',
    },
  ],
  RequestId: '20201211184904117',
  ResponseCode: '00',
  ResponseMessage: 'Successful',
}

const transactionCheck = {
  code: '00',
  message: JSON.stringify(transactionCheckData),
  otherMessage: '',
}

module.exports = {
  accountBVNResponse: accountBVN,
  accountLienResponse: accountLien,
  accountUpdateResponse: accountUpdate,
  balanceEnquiryResponse: balanceEnquiry,
  accountFreezeResponse: accountFreeze,
  reversalCheckResponse: reversalCheck,
  transactionCheckResponse: transactionCheck,
}
