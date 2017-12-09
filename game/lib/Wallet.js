define(function () {
  function Wallet (contentObject) {
    Object.keys(contentObject).forEach(key => {
      this[key] = contentObject[key]
      this[key].amount = 0
    })
  }
  return Wallet
})
