define(function (require) {
  var formatNumber = require('lib/formatNumber')
  var sfx = require('lib/sfx')

  var farmDraw = {
    count: 0,
    draw: function (game, ctx) {
      ctx.restore()
      game.buildings.farm.buttons.get('click').fill = '#000'

      this.increment(game.buildings.farm)
      this.drawImage(ctx, game.buildings.farm)

      if (game.buildings.farm.amount === 0) {
        this.drawBuild(game, ctx, game.buildings.farm)
      } else this.drawNormal(ctx, game.buildings.farm)

      game.buildings.farm.buttons.forEach(value => {
        value.draw(game, ctx)
      })
    },
    increment: function (farm) {
      if (farm.buttons.get('click').hover) {
        this.count++
        return this.count
      }
      this.count = 0
      return this.count
    },
    drawImage: function (ctx, farm) {
      ctx.globalAlpha = 0.4
      if (farm.amount > 0) ctx.globalAlpha = 1
      else if (farm.buttons.get('click').hover) ctx.globalAlpha = 0.7

      ctx.drawImage(ctx.images.farm, 450 - 39, 513, 76, 76)
      ctx.globalAlpha = 1
    },
    drawBuild: function (game, ctx, farm) {
      ctx.fillStyle = '#000'
      ctx.font = '22px monospace'
      ctx.textAlign = 'left'

      if (farm.buttons.get('click').hover && farm.canBuild(game, 1)) {
        ctx.fillStyle = '#2a2'
        farm.buttons.get('click').fill = '#2a2'
        sfx.happyDraw(ctx, 'Build Farm', 389, 506, this.count)
      } else {
        ctx.fillText('Build Farm', 389, 506)
      }

      ctx.fillStyle = '#000'
      ctx.font = '20px monospace'
      ctx.textAlign = 'right'

      var cost = formatNumber(farm.getCost().get('food'))
      ctx.fillText(cost, 450, 602)
      ctx.drawImage(ctx.images.food, 459, 586, 18, 18)
    },
    drawNormal: function (ctx, farm) {
      ctx.fillStyle = '#000'
      ctx.font = '22px monospace'
      ctx.textAlign = 'left'

      ctx.fillText('Farm', 389, 506)
      ctx.textAlign = 'right'
      ctx.fillText(farm.amount, 511, 506)
    }
  }
  return farmDraw
})
