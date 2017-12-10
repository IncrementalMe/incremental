define(function (require) {
  var settings = require('../settings.js')

  var buildings = {
    farm: {
      effect: function (game) {
        game.wallet.food.amount += (1 * this.amount) / settings.updatesPerSecond
      }
    }
  }

  return buildings
})
