define(function (require) {
  var formatNumber = require('lib/formatNumber')
  var settings = require('settings')

  var farmDraw = {
    sfx: require('lib/sfx'),
    gameLogicUpdates: 0,
    count: 0,
    draw: function (game, ctx) {
      ctx.restore()

      var farm = game.buildings.farm
      farm.buttons.get('click').fill = '#000'

      this.incrementCounter(farm)
      this.drawImage(ctx, farm)

      if (farm.built) {
        this.drawNormal(ctx, farm)
        if (this.gameLogicUpdates >= settings.ups) {
          this.sfx.createSprite(ctx.images.food, { x: 444, y: 546 })
          this.gameLogicUpdates -= settings.ups
        }
      } else {
        this.drawBuild(game, ctx, farm)
      }

      farm.buttons.forEach(btt => {
        btt.draw(game, ctx)
      })

      this.sfx.draw(ctx)
    },
    logicTick: function (game) {
      if (game.buildings.farm.built) {
        this.gameLogicUpdates++
      }
    },
    incrementCounter: function (farm) {
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
        this.sfx.happyDraw(ctx, 'Build Farm', 389, 502, this.count)
        var button = farm.buttons.get('click')
        var rect = {
          x: button.x - button.width / 2,
          y: button.y - button.height / 2,
          width: button.width,
          height: button.height
        }
        ctx.fillStyle = '#2a2'
        ctx.globalAlpha = 0.1
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
        ctx.globalAlpha = 1
      } else {
        ctx.fillText('Build Farm', 389, 502)
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

      ctx.fillText('Farm', 389, 502)

      if (farm.points > 0) {
        ctx.textAlign = 'right'
        ctx.fillText('+' + farm.points, 511, 502)
      }

      ctx.font = '20px monospace'
      var text = formatNumber(-farm.effects[0].amount, 1)
      if (-farm.effects[0].amount > 0) {
        text = '+' + text
      } else {
        text = '-' + text
      }
      ctx.fillText(text, 420, 603)
      ctx.fillText('/s', 428 + ctx.measureText(text).width, 603)
      ctx.drawImage(ctx.images.food, 393, 585, 21, 21)
    }
  }

  return farmDraw
})
