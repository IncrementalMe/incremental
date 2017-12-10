define(function (require) {
  var Button = require('Button')

  var buttons = [
    new Button({
      x: 110,
      y: 575,
      text: '+1 5g',
      onClick: function (game) {
        if (game.wallet.pay('gold', 5)) game.buildingWallet.farm.amount += 1
      }
    })
  ]
  return buttons
})
