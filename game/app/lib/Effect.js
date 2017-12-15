define(function (require) {
  var settings = require('settings')

  function Effect (game, preEffect) {
    Object.keys(preEffect).forEach(key => {
      this[key] = preEffect[key]
    })

    this.parent = preEffect.parent
  }

  Effect.prototype.do = function (game) {
    if (this.parent.built) {
      var cost = this.amount
      game[this.target].pay(this.resource, cost / settings.ups, true)
    }
  }

  return Effect
})
