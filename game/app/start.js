define(function (require) {
  var Wallet = require('lib/Wallet')
  var mouse = require('mouse')
  var effects = require('effects')
  var loop = require('loop')

  var game = {
    wallet: new Wallet(require('content/resources')),
    buildings: new Wallet(require('content/buildings')),
    buttons: require('content/buttons'),
    mousePos: {}
  }
  effects.initializeBuildingEffects(game)
  game.wallet.food.amount = 1

  mouse.start(game)
  loop.start(game)
})
