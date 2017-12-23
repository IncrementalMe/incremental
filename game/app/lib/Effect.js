define(function (require) {
  var settings = require('settings')

  function Effect (input, parent) {
    this.type = input.type
    this.value = input.value
    this.parent = parent
  }

  Effect.prototype.do = function (game, ticks) {
    if (this.parent.built) {
      if (this.type === 'income') {
        game.wallet.pay(this.value, -1 / settings.ups * ticks, true)
      }
    }
  }

  return Effect
})
