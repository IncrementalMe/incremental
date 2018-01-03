define(function (require) {
  var formatNumber = require('lib/formatNumber')
  var ctxUtils = require('lib/ctxUtils')

  function draw (game, ctx) {
    if (this.visable) {
      if (this.built) {
        ctxUtils.wrap(ctx, drawParts.built)(game, ctx, this)
      } else {
        ctxUtils.wrap(ctx, drawParts.unbuilt)(game, ctx, this)
      }

      ctxUtils.wrap(ctx, drawParts.buttons)(game, ctx, this)
      ctxUtils.wrap(ctx, this.sfx.draw)(ctx)
    }
  }

  var drawParts = {
    unbuilt: function (game, ctx, building) {
      var btt = building.buttons.get('click')
      ctx.translate(btt.x - btt.width / 2, btt.y - btt.height / 2)
      ctx.font = '22px monospace'

      var text = 'Build ' + building.name
      if (btt.hover && building.canBuild(game)) {
        ctx.fillStyle = '#2a2'
        building.sfx.happyDraw(ctx, text, -1, -4, btt.hoverCount)
      } else {
        ctx.fillText(text, -1, -4)
      }

      ctx.font = '20px monospace'
      ctx.textAlign = 'right'

      var i = 0
      building.buildCost.forEach((value, key) => {
        ctx.fillText(formatNumber(value), 60, 96 + i * 22)
        ctx.drawImage(ctx.images[key], 69, 80 + i * 22, 18, 18)
        i++
      })

      if (building.buttons.get('click').hover) ctx.globalAlpha = 0.7
      else ctx.globalAlpha = 0.4
      ctx.drawImage(ctx.images[building.name], 18, 10, 76, 76)
    },
    built: function (game, ctx, building) {
      var btt = building.buttons.get('click')
      ctx.translate(btt.x - btt.width / 2, btt.y - btt.height / 2)

      ctx.font = '22px monospace'
      ctx.fillText(building.name, -1, -4)

      if (building.points > 0) {
        ctx.textAlign = 'right'
        ctx.fillText('+' + building.points, 21, -4)
      }
      ctx.drawImage(ctx.images[building.name], 18, 10, 76, 76)
    },
    buttons: function (game, ctx, building) {
      building.buttons.forEach(btt => {
        btt.draw(game, ctx)
      })
    }
  }

  return draw
})
