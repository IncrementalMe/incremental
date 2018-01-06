define(function (require) {
  function Building (input) {
    Object.keys(input).forEach(key => {
      this[key] = input[key]
    })

    this.draw = require('draw/buildingDraw')
    this.sfx = require('draw/sfx')
    this.built = false
    this.xp = 0
    this.level = 0
    this.points = 0
  }
  Building.prototype.doEffect = function (game) {}

  Building.prototype.xpAdd = function (value) {
    this.xp += value
    while (this.xp > this.xpNextLevel) {
      this.level += 1
      this.points += 1
    }
  }

  Building.prototype.xpNextLevel = function () {
    return Math.pow(10, 1 + this.level)
  }

  Building.prototype.build = function (game) {
    if (this.built === false) {
      if (game.wallet.pay(this.buildCost)) {
        this.built = true
        return true
      }
    }
    return false
  }

  Building.prototype.canBuild = function (game) {
    return game.wallet.canPay(this.buildCost)
  }

  return Building
})
