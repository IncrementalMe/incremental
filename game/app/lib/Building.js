define(function (require) {
  function Building (input) {
    Object.keys(input).forEach(key => {
      this[key] = input[key]
    })
  }

  Building.prototype.getEffect = function (game) {
    return new Map([[]])
  }

  Building.prototype.doEffect = function (game) {}

  Building.prototype.getCost = function () {
    return new Map([[]])
  }

  Building.prototype.build = function (game, amount) {
    if (game.resources.pay(this.getCost(), amount)) {
      game.buildings.pay(this.name, -amount)
      return true
    }
    return false
  }

  Building.prototype.canBuild = function (game, amount) {
    var cost = game.buildings[this.name].getCost()
    return game.resources.canPay(cost, amount)
  }

  return Building
})
