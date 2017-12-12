define(function (require) {
  var formatNumber = require('lib/formatNumber')

  var farm = {
    name: 'farm',
    defaultEffects: [
      {
        target: 'resources',
        resource: 'food',
        amount: -1
      }
    ],
    getCost: function () {
      var cost = 1 * Math.pow(10, this.amount)
      return new Map([['food', cost]])
    },
    draw: function (game, ctx) {
      var text

      ctx.fillStyle = '#000'
      ctx.font = '26px monospace'
      ctx.textAlign = 'left'
      // Farm
      ctx.font = '22px monospace'
      if (game.buildings.farm.amount > 0) {
        ctx.fillText('Farm', 389, 506)
        ctx.textAlign = 'right'
        ctx.fillText(game.buildings.farm.amount, 511, 506)
      } else {
        ctx.fillText('Build Farm', 389, 506)
      }
      ctx.drawImage(ctx.images.farm, 450 - 39, 513, 76, 76)
      ctx.font = '20px monospace'

      ctx.textAlign = 'right'
      text = formatNumber(game.buildings.farm.getCost().get('food'))
      ctx.fillText(text, 450, 602)
      ctx.drawImage(ctx.images.food, 459, 586, 18, 18)
    }
  }
  return farm
})
