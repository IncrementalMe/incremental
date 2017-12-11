define(function (require) {
  var settings = require('../settings.js')

  var buildings = {
    farm: {
      effect: function (game) {
        var cost = -1 * this.amount / settings.updatesPerSecond
        game.wallet.pay('food', cost)
      },
      getCost: function () {
        var cost = 1 * Math.pow(10, this.amount)
        return new Map([['food', cost]])
      },
      build: function (game, amount) {
        if (game.wallet.pay(this.getCost(), amount)) {
          game.buildings.pay('farm', -amount)
        }
      }
    }
  }

  return buildings
})
