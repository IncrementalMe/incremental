define(function (require) {
  var Wallet = require('lib/Wallet')
  var draw = require('draw')
  var mouse = require('mouse')
  var settings = require('settings')
  var effects = require('effects')

  var game = {
    wallet: new Wallet(require('content/resources')),
    buildings: new Wallet(require('content/buildings')),
    buttons: require('content/buttons'),
    mousePos: {}
  }
  effects.initializeBuildingEffects(game)
  game.wallet.food.amount = 1

  mouse.start(game)
  draw.start(loop)

  var lastTick = new Date().getTime()
  var deltaTime2 = 0
  function loop () {
    var now = new Date().getTime()
    var deltaTime = now - lastTick
    deltaTime2 += deltaTime
    lastTick = now

    if (deltaTime2 >= 1000 / settings.updatesPerSecond) {
      deltaTime2 -= 1000 / settings.updatesPerSecond

      Object.keys(game.buildings).forEach(key => {
        game.buildings[key].effects.forEach(effect => {
          effect.do(game)
        })
      })
      game.buttons.forEach(buttonObject => {
        buttonObject.update(game)
      })
    }

    draw.draw(game)
    window.requestAnimationFrame(loop)
  }
})
