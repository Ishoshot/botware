const Entrust = require('../api/Entrust')
const entrust = new Entrust()

class Navigator {
  entrust(req, res) {
    console.log('Navigator -- Entrust')
    let type = req.body.request_type
    if (!type) {
      return res.status(500).json({ message: 'Invalid Entrust Operation' })
    } else {
      switch (type) {
        case 'block':
          entrust.block(req, res)
          break
        case 'unlock':
          entrust.unlock(req, res)
          break
        default:
          return res.status(500).json({ message: 'Invalid Entrust Operation' })
      }
    }
  }
}

module.exports = Navigator
