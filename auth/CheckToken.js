const dotenv = require('dotenv')
dotenv.config()

const _token = process.env.TOKEN

module.exports = {
  checkToken: (token, res) => {
    if (token !== _token) {
      res.status(403).json({ message: 'Unauthorized' })
      return false
    } else {
      return true
    }
  },
}
