define(function (require) {
  var Button = require('lib/Button')

  var settlement = {
    reputation: 0,
    showReputation: false,
    drawObject: require('content/settlementDraw'),
    buttons: new Map([]),
    trades: [{
      cost: new Map([['food', 20]]),
      reward: new Map([['gold', 1]])
    }]
  }

  for (var i = 0; i < settlement.trades.length; i++) {

    var buttonInput = {
      pos: i,
      x: 100,
      y: 580 - i * 140,
      width: 120,
      height: 40,
      click: function (game) {
        var trade = game.settlement.trades[buttonInput.pos]

        if (game.wallet.trade(trade)) {
          game.settlement.reputation += 1
          game.settlement.showReputation = true
        }
      },
      hoverCondition: function (game) {
        var tradeCost = game.settlement.trades[buttonInput.pos].cost
        return game.wallet.canPay(tradeCost)
      },
      hidden: false
    }

    settlement.buttons.set('trade' + i, new Button(buttonInput))
  }

  return settlement
})
