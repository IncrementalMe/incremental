define(function (require) {
  var ctxUtils = require('lib/ctxUtils')

  function draw (game, ctx) {
    if (game.buildings.farm.built) {
      ctxUtils.wrap(ctx, drawParts.trades)(ctx, game.settlement)
      ctxUtils.wrap(ctx, drawParts.reputation)(ctx, game.settlement)
      ctxUtils.wrap(ctx, drawParts.buttons)(game, ctx)
    }
  }

  var drawParts = {
    trades: function (ctx, settlement) {
      ctx.font = '20px monospace'
      ctx.translate(38, 450)

      ctx.fillText('Settlement trades', 0, 72)

      var text = 'Sell ' + settlement.trades[0].cost.get('food')
      var x = ctx.measureText(text).width + 4
      ctx.fillText(text, 0, 97)
      ctx.drawImage(ctx.images.food, x, 81, 17, 17)

      text = ' for ' + settlement.trades[0].reward.get('gold')
      ctx.fillText(text, x + 21, 97)
      x += ctx.measureText(text).width + 24
      ctx.drawImage(ctx.images.gold, x, 81, 21, 21)
    },

    reputation: function (ctx, settlement) {
      if (settlement.showReputation) {
        var text = 'Reputation ' + settlement.reputation
        ctx.font = '20px monospace'
        ctx.fillText(text, 30, 487)
      }
    },

    buttons: function (game, ctx) {
      game.settlement.buttons.forEach(btt => {
        btt.draw(game, ctx)
      })
    }
  }

  return { draw: draw }
})
