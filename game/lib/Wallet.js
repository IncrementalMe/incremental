define(function () {
  function Wallet (contentObject) {
    Object.keys(contentObject).forEach(key => {
      this[key] = contentObject[key]
      this[key].amount = 0
    })
  }

  Wallet.prototype.pay = function (resource, amount, allowNegative = false) {
    if (this[resource].amount >= amount || allowNegative) {
      this[resource].amount -= amount
      return true
    }
    return false
  }

  Wallet.prototype.canPay = function (resource, amount) {
    if (this[resource].amount >= amount) return true
    return false
  }

  Wallet.prototype.payLedger = function (ledgerObject) {
    var count = 0
    Object.keys(ledgerObject).forEach(key => {
      if (this.canPay(key, ledgerObject[key])) {
        count += 1
      }
    })

    if (count === Object.keys(ledgerObject).length) {
      Object.keys(ledgerObject).forEach(key => {
        this.pay(key, ledgerObject[key])
      })
      return true
    }
    return false
  }

  return Wallet
})
