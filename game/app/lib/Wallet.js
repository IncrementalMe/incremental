define(function () {
  function Wallet (contentObject) {
    Object.keys(contentObject).forEach(key => {
      this[key] = contentObject[key]
      this[key].amount = 0
    })
  }

  Wallet.prototype.trade = function (trade, amount = 1, allowNegative = false) {
    if (this.canTrade(trade, amount, allowNegative)) {
      this.pay(trade.cost, amount, allowNegative)
      this.pay(trade.reward, -1, true)
      return true
    }
    return false
  }

  Wallet.prototype.canTrade = function (trade, amount = 1, allowNegative = false) {
    if (this.canPay(trade.cost)) return true
    return false
  }

  Wallet.prototype.pay = function (keyOrMap, amount = 1, allowNegative = false) {
    if (amount === 0) return true

    if (typeof keyOrMap === 'string') {
      return this.paySingle(keyOrMap, amount, allowNegative)
    }

    if (keyOrMap instanceof Map) {
      if (allowNegative || this.canPay(keyOrMap)) {
        keyOrMap.forEach((value, key) => {
          this.paySingle(key, value * amount, allowNegative)
        })
        return true
      }
      return false
    }

    throw new Error('arg0 keyOrMap not String or Map')
  }

  Wallet.prototype.paySingle = function (resource, amount, allowNegative) {
    if (this.canPay(resource, amount) || allowNegative) {
      this[resource].amount -= amount
      return true
    }
    return false
  }

  Wallet.prototype.canPay = function (keyOrMap, amount) {
    if (typeof keyOrMap === 'string') {
      return this.canPaySingle(keyOrMap, amount)
    }

    if (keyOrMap instanceof Map) {
      var count = 0
      keyOrMap.forEach((value, key) => {
        if (this.canPaySingle(key, value)) {
          count += 1
        }
      })

      if (count === keyOrMap.size) return true
      return false
    }
  }

  Wallet.prototype.canPaySingle = function (resource, amount) {
    if (this[resource].amount >= amount) return true
    return false
  }

  return Wallet
})
