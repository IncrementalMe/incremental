define(function () {
  function Wallet (contentObject) {
    Object.keys(contentObject).forEach(key => {
      this[key] = contentObject[key]
      this[key].amount = 0
    })
  }

  Wallet.prototype.pay = function (keyOrMap, amount, allowNegative = false) {
    if (amount === 0) return true

    if (typeof keyOrMap === 'string') {
      return this.paySingle(keyOrMap, amount, allowNegative)
    }

    if (keyOrMap instanceof Map) {
      if (this.canPay(keyOrMap)) {
        keyOrMap.forEach((value, key) => {
          this.paySingle(key, value * amount)
        })
        return true
      }
      return false
    }

    throw new Error('Wallet.js pay() arg1 not String or Map')
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
    if (this[resource].amount >= amount) {
      return true
    }
    return false
  }

  return Wallet
})
