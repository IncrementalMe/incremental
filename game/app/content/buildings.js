define(function (require) {
  var Building = require('Building')

  var buildings = {
    farm: new Building({
      name: 'farm',
      defaultEffects: [{
        target: 'wallet',
        resource: 'food',
        amount: -1
      }],
      getCost: function () {
        var cost = 1 * Math.pow(10, this.amount)
        return new Map([['food', cost]])
      }
    })
  }

  return buildings
})
