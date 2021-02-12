var date = new Date()

module.exports = {
  getDate: () => {
    return date
  },

  getFileDate: () => {
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let fileDate = day + '-' + month + '-' + year
    return fileDate
  },

  isWeekend: () => {
    if (date.getDay() == 6 || date.getDay() == 0) alert('Weekend!')
  },
}
