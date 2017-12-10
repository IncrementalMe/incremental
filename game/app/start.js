define(function (require) {
  var Wallet = require('Wallet')
  var draw = require('./draw.js')
  var mouse = require('./mouse.js')

  var game = {
    wallet: new Wallet(require('./content/resources.js')),
    buildingWallet: new Wallet(require('./content/buildings.js')),
    buttons: require('./content/buttons.js'),
    mousePos: {}
  }
  game.wallet.gold.amount = 100
  game.wallet.food.amount = 10
  mouse.start(game)

  function loop () {
    Object.keys(game.buildingWallet).forEach(key => {
      game.buildingWallet[key].effect(game)
    })
    game.buttons.forEach(buttonObject => {
      buttonObject.update(game)
    })

    draw.draw(game)
    window.requestAnimationFrame(loop)
  }

  draw.start(loop)
})
