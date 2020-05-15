const fetch = require('node-fetch')
const { url } = require('../config.json')

const list = async (date) => {
  const response = await fetch(url)
  const data = await response.json()
  return data
    .response
    .items
    .filter(item => {
      return true
    })
}

module.exports = {
  list
}
