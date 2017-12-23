define(function (require) {
  var Wallet = require('lib/Wallet')
  var mouse = require('mouse')
  var loop = require('loop')

  var game = {
    resources: new Wallet(require('content/resources')),
    buildings: require('content/buildings'),
    settlement: require('content/settlement'),
    mousePos: {}
  }
  game.resources.pay('food', -100)
  game.resources.pay('gold', -42)

  mouse.start(game)
  loop.start(game)
})
