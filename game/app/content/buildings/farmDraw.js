define(function (require) {
  var formatNumber = require('lib/formatNumber')
  var settings = require('settings')

  var farmDraw = {
    sfx: require('lib/sfx'),
    gameLogicUpdates: 0,
    count: 0,
    draw: function (game, ctx) {
      ctx.restore()
      game.buildings.farm.buttons.get('click').fill = '#000'

      this.increment(game.buildings.farm)
      this.drawImage(ctx, game.buildings.farm)

      if (game.buildings.farm.built) {
        this.drawNormal(ctx, game.buildings.farm)
        if (this.gameLogicUpdates >= settings.ups) {
          this.sfx.createSprite(ctx.images.food, {x: 444, y: 546})
          this.gameLogicUpdates -= settings.ups
        }
      } else {
        this.drawBuild(game, ctx, game.buildings.farm)
      }

      game.buildings.farm.buttons.forEach(value => {
        value.draw(game, ctx)
      })

      this.sfx.draw(ctx)
    },
    logicTick: function () {
      this.gameLogicUpdates++
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
      if (farm.built) ctx.globalAlpha = 1
      else if (farm.buttons.get('click').hover) ctx.globalAlpha = 0.7

      ctx.drawImage(ctx.images.farm, 450 - 39, 513, 76, 76)
      ctx.globalAlpha = 1
    },
    drawBuild: function (game, ctx, farm) {
      ctx.fillStyle = '#000'
      ctx.font = '22px monospace'
      ctx.textAlign = 'left'

      if (farm.buttons.get('click').hover && farm.canBuild(game)) {
        ctx.fillStyle = '#2a2'
        farm.buttons.get('click').fill = '#2a2'
        this.sfx.happyDraw(ctx, 'Build Farm', 389, 506, this.count)
      } else {
        ctx.fillText('Build Farm', 389, 506)
      }

      ctx.font = '20px monospace'
      ctx.textAlign = 'right'

      var cost = formatNumber(farm.buildCost.get('food'))
      ctx.fillText(cost, 450, 602)
      ctx.drawImage(ctx.images.food, 459, 586, 18, 18)
    },
    drawNormal: function (ctx, farm) {
      ctx.fillStyle = '#000'
      ctx.font = '22px monospace'
      ctx.textAlign = 'left'

      ctx.fillText('Farm', 389, 506)

      if (farm.points > 0) {
        ctx.textAlign = 'right'
        ctx.fillText('+' + farm.points, 511, 506)
      }
    }
  }

  return farmDraw
})
