define(function (require) {
  var Wallet = require('Wallet')
  var resources = require('./content/resources.js')
  var draw = require('./draw.js')

  var wallet = new Wallet(resources)

  draw.start(wallet)
})
