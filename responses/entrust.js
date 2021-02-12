/* -------------------------------------------------------------------------- */
/*                                 Lock Token                                 */
/* -------------------------------------------------------------------------- */

const lockToken = {
  code: '00',
  message: 'Token Locked Successfully',
  otherMessage: '',
}

/* -------------------------------------------------------------------------- */
/*                                 UnLock Token                               */
/* -------------------------------------------------------------------------- */

const unlockToken = {
  code: '00',
  message: "Sorry, You don't have permission to carry out this operation",
  otherMessage: '',
}

/* -------------------------------------------------------------------------- */
/*                                 Status Enquiry                             */
/* -------------------------------------------------------------------------- */

const statusEnquiryData = {
  Tokens: [
    {
      UserName: 'TMP01457',
      Group: 'dDL_Staff',
      SerialNumber: '0930970971',
      ActivationState: 'HOLD',
      LockState: 'Unlocked',
    },
  ],
  FullName: 'John Olamide',
  LastSuccessfulAuthTime: '2019-06-24T10:08:40Z',
  LastFailedAuthTime: '2020-07-02T14:04:08Z',
  ResponseCode: '00',
  ResponseMessage: 'Successful',
  RequestId: '20210205075018434',
}

const statusEnquiry = {
  code: '00',
  message: JSON.stringify(statusEnquiryData),
  otherMessage: '',
}

module.exports = {
  lockTokenResponse: lockToken,
  unlockTokenResponse: unlockToken,
  statusEnquiryResponse: statusEnquiry,
}
