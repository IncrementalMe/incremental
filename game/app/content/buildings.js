define(function (require) {
  var settings = require('../settings.js')

  var buildings = {
    farm: {
      effect: function (game) {
        game.wallet.pay('food', -1 * this.amount / settings.updatesPerSecond)
      },
      getCost: function () {
        return { food: 1 * Math.pow(10, this.amount) }
      }
    }
  }

  return buildings
})
