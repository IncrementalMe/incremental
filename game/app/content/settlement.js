define(function (require) {
  var Button = require('lib/Button')

  var settlement = {
    reputation: 0,
    showReputation: false,
    drawObject: require('content/settlementDraw'),
    buttons: new Map([]),
    trade: {
      cost: new Map([['food', 10]]),
      reward: new Map([['gold', 1]])
    }
  }

  var input = {
    x: 100,
    y: 580,
    width: 120,
    height: 40,
    click: function (game) {
      var settlement = game.settlement
      var trade = settlement.trade

      if (game.wallet.pay(trade.cost)) {
        if (settlement.reputation === 0) settlement.showReputation = true
        game.wallet.pay(trade.reward, -1, true)
        game.settlement.reputation += 1
      }
    },
    hidden: false
  }
  settlement.buttons.set('trade', new Button(input))
  return settlement
})
