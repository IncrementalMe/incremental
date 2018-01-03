define(function (require) {
  var Wallet = require('lib/Wallet')
  var mouse = require('mouse')
  var loop = require('loop')

  var game = {
    wallet: new Wallet(require('content/resources')),
    buildings: require('content/buildings'),
    settlement: require('content/settlement'),
    mousePos: {}
  }
  game.wallet.pay('food', -100)

  mouse.start(game)
  loop.start(game)
})
