define(function (require) {
  var Wallet = require('lib/Wallet')
  var mouse = require('mouse')
  var effects = require('effects')
  var loop = require('loop')

  var game = {
    resources: new Wallet(require('content/resources')),
    buildings: new Wallet(require('content/buildings')),
    buttons: require('content/buttons'),
    mousePos: {}
  }
  effects.initializeBuildingEffects(game)
  game.resources.food.amount = 1

  mouse.start(game)
  loop.start(game)
})
