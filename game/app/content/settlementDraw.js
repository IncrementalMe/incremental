define(function (require) {
  var ctxUtils = require('lib/ctxUtils')

  function draw (game, ctx) {
    if (game.buildings.farm.built) {
      ctxUtils.wrap(ctx, drawParts.normal)(ctx, game.settlement)
      ctxUtils.wrap(ctx, drawParts.reputation)(ctx, game.settlement)
      ctxUtils.wrap(ctx, drawParts.buttons)(game, ctx)
    }
  }

  var drawParts = {
    normal: function (ctx, settlement) {
      ctx.font = '20px monospace'
      ctx.translate(0, 450)
      ctx.fillText('Settlement', 38, 72)

      var text = 'Trade ' + settlement.trade.cost.get('food')
      text += '   for ' + settlement.trade.reward.get('gold')
      ctx.fillText(text, 38, 97)
      ctx.drawImage(ctx.images.food, 128, 81, 21, 21)
      ctx.drawImage(ctx.images.gold, 217, 81, 21, 21)
    },

    reputation: function (ctx, settlement) {
      if (settlement.showReputation) {
        var text = 'Reputation ' + settlement.reputation
        ctx.font = '20px monospace'
        ctx.fillText(text, 30, 487)
      }
    },

    buttons: function (game, ctx) {
      var settlement = game.settlement
      var btt = settlement.buttons.get('trade')
      var canPay = game.wallet.canPay(settlement.trade.cost)

      if (btt.hover && canPay) {
        btt.fill = '#2a2'
      }

      game.settlement.buttons.forEach(btt => {
        btt.draw(game, ctx)
      })
    }
  }

  return { draw: draw }
})
