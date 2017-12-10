define(function (require) {
  var Wallet = require('Wallet')
  var draw = require('./draw.js')
  var mouse = require('./mouse.js')
  var settings = require('./settings.js')

  var game = {
    wallet: new Wallet(require('./content/resources.js')),
    buildingWallet: new Wallet(require('./content/buildings.js')),
    buttons: require('./content/buttons.js'),
    mousePos: {}
  }
  game.wallet.gold.amount = 10000
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

      Object.keys(game.buildingWallet).forEach(key => {
        game.buildingWallet[key].effect(game)
      })
      game.buttons.forEach(buttonObject => {
        buttonObject.update(game)
      })
    }

    draw.draw(game)
    window.requestAnimationFrame(loop)
  }
})
