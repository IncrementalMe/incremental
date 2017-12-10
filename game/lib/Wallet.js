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
  return Wallet
})
