define(function (require) {
  var settings = require('../settings.js')

  var buildings = {
    farm: {
      effect: function (game) {
        game.wallet.pay('food', -1 * this.amount / settings.updatesPerSecond)
      },
      getCost: function () {
        var cost = 1 * Math.pow(10, this.amount)
        return new Map([['food', cost]])
      },
      build: function (game, amount) {
        if (game.wallet.pay(this.getCost(), amount)) {
          game.buildingWallet.pay('farm', -amount)
        }
      }
    }
  }

  return buildings
})
