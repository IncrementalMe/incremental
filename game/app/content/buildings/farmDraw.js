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

    if (farm.built === false) {
      ctxUtils.wrap(ctx, drawParts.build)(game, ctx)
    } else {
      ctxUtils.wrap(ctx, drawParts.normal)(ctx, farm)

      if (logicUpdates >= settings.ups) {
        sfx.createSprite(ctx.images.food, { x: 444, y: 546 })
        logicUpdates -= settings.ups
      }
    }
  }

  function logicTick (game) {
    if (game.buildings.farm.built) logicUpdates++
  }

  function incrementCounter (farm) {
    if (farm.buttons.get('click').hover) count++
    else count = 0
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
      ctx.translate(btt.x - btt.width / 2, btt.y - btt.height / 2)
      ctx.font = '22px monospace'

      if (btt.hover && farm.canBuild(game)) {
        ctx.fillStyle = '#2a2'
        btt.fill = '#2a2'

        ctx.globalAlpha = 0.1
        ctx.fillRect(0, 0, btt.width, btt.height)
        ctx.globalAlpha = 1
        sfx.happyDraw(ctx, 'Build Farm', -1, -4, count)
      } else {
        ctx.fillText('Build Farm', -1, -4)
      }

      ctx.font = '20px monospace'
      ctx.textAlign = 'right'
      var cost = formatNumber(farm.buildCost.get('food'))
      ctx.fillText(cost, 60, 96)
      ctx.drawImage(ctx.images.food, 69, 80, 18, 18)
    },

    normal: function (ctx, farm) {
      var btt = farm.buttons.get('click')
      ctx.translate(btt.x - btt.width / 2, btt.y - btt.height / 2)

      ctx.font = '22px monospace'
      ctx.fillText('Farm', -1, -4)

      if (farm.points > 0) {
        ctx.textAlign = 'right'
        ctx.fillText('+' + farm.points, 21, -4)
      }

      ctx.font = '20px monospace'
      var text = formatNumber(farm.effects[0].value.get('food'), 1)
      if (text > 0) text = '+' + text
      else text = '-' + text

      ctx.fillText(text, 30, 97)
      ctx.fillText('/s', 38 + ctx.measureText(text).width, 97)
      ctx.drawImage(ctx.images.food, 3, 79, 21, 21)
    },

    buttons: function (game, ctx) {
      game.buildings.farm.buttons.forEach(btt => {
        btt.draw(game, ctx)
      })
    }
  }

  return { draw: draw, logicTick: logicTick }
})
