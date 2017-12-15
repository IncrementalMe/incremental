define(function (require) {
  var Wallet = require('lib/Wallet')
  var mouse = require('mouse')
  var effects = require('effects')
  var loop = require('loop')

  var game = {
    resources: new Wallet(require('content/resources')),
    buildings: new Wallet(require('content/buildings')),
    mousePos: {}
  }
  effects.initializeBuildingEffects(game)
  game.resources.pay('food', -100)
  game.resources.pay('gold', -42)

  mouse.start(game)
  loop.start(game)
})
