class Validator {
  entrust(req, res) {
    var id = req.body.serial_number
    if (!id) {
      res.status(500).json({ message: 'Please Provide Your Serial Number' })
      return false
    } else {
      return true
    }
  }
}

module.exports = Validator
