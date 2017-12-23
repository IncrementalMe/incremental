define(function (require) {
  var formatNumber = require('lib/formatNumber')
  var ctxUtils = require('lib/ctxUtils')
  var settings = require('settings')
  var sfx = require('lib/sfx')

  var logicUpdates = 0
  var count = 0

  function draw (game, ctx) {
    var farm = game.buildings.farm

    incrementCounter(farm)
    ctxUtils.wrap(ctx, drawParts.image)(ctx, farm)
    ctxUtils.wrap(ctx, drawParts.buttons)(game, ctx)
    ctxUtils.wrap(ctx, sfx.draw)(ctx)

    if (farm.built) {
      ctxUtils.wrap(ctx, drawParts.normal)(ctx, farm)

      if (logicUpdates >= settings.ups) {
        sfx.createSprite(ctx.images.food, { x: 444, y: 546 })
        logicUpdates -= settings.ups
      }
    } else {
      ctxUtils.wrap(ctx, drawParts.build)(game, ctx)
    }
  }

  function logicTick (game) {
    if (game.buildings.farm.built) logicUpdates++
  }

  function incrementCounter (farm) {
    if (farm.buttons.get('click').hover) count++
    else count = 0
    return count
  }

  var drawParts = {
    image: function (ctx, farm) {
      if (farm.built === false) {
        if (farm.buttons.get('click').hover) ctx.globalAlpha = 0.7
        else ctx.globalAlpha = 0.4
      }
      ctx.drawImage(ctx.images.farm, 450 - 39, 513, 76, 76)
    },
    build: function (game, ctx) {
      var farm = game.buildings.farm
      var btt = farm.buttons.get('click')
      ctx.font = '22px monospace'

      if (btt.hover && farm.canBuild(game)) {
        ctx.fillStyle = '#2a2'
        btt.fill = '#2a2'

        var x = btt.x - btt.width / 2
        var y = btt.y - btt.height / 2
        ctx.globalAlpha = 0.1
        ctx.fillRect(x, y, btt.width, btt.height)
        ctx.globalAlpha = 1
        ctxUtils.wrap(ctx, sfx.happyDraw)(ctx, 'Build Farm', 389, 502, count)
      } else {
        ctx.fillText('Build Farm', 389, 502)
      }

      ctx.font = '20px monospace'
      ctx.textAlign = 'right'
      var cost = formatNumber(farm.buildCost.get('food'))
      ctx.fillText(cost, 450, 602)
      ctx.drawImage(ctx.images.food, 459, 586, 18, 18)
    },
    normal: function (ctx, farm) {
      ctx.font = '22px monospace'
      ctx.fillText('Farm', 389, 502)

      if (farm.points > 0) {
        ctx.textAlign = 'right'
        ctx.fillText('+' + farm.points, 511, 502)
      }

      ctx.font = '20px monospace'
      var text = formatNumber(farm.effects[0].value.get('food'), 1)
      if (text > 0) text = '+' + text
      else text = '-' + text

      ctx.fillText(text, 420, 603)
      ctx.fillText('/s', 428 + ctx.measureText(text).width, 603)
      ctx.drawImage(ctx.images.food, 393, 585, 21, 21)
    },
    buttons: function (game, ctx) {
      game.buildings.farm.buttons.forEach(btt => {
        btt.draw(game, ctx)
      })
    }
  }

  return { draw: draw, logicTick: logicTick }
})
