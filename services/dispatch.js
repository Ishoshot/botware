const Navigator = require('./navigator')
const navigator = new Navigator()

module.exports = {
  dispatch: (req, res) => {
    let type = req.body.activity
    if (!type) {
      return res.status(500).json({ message: 'No Activity Choosen' })
    } else {
      switch (type) {
        case 'entrust_request':
          navigator.entrust(req, res)
          break
        default:
          return res.status(500).json({ message: 'No Activity Choosen' })
      }
    }
  },
}
