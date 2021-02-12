/* -------------------------------------------------------------------------- */
/*                                 Digital Loan                             */
/* -------------------------------------------------------------------------- */
const Reasons =
  '\r- No visible 4 or more months of salary payments in last 6 months\r- Not Eligible based on 0.5 DSR\r- Not Eligible based on Whitelist\r- No visible 30 days salary'

const digitalLoan = {
  code: '00',
  message:
    'Account Number: 8729073873998, **NOT ELIGIBLE** ' + '\r-' + Reasons + '\r',
  otherMessage: 'Successful',
}

module.exports = {
  digitalLoanResponse: digitalLoan,
}
