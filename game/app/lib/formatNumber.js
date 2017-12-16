define(function () {
  var suffices = [
    'K',
    'M',
    'B',
    'T',
    'Qa',
    'Qi',
    'Sx',
    'Sp',
    'Oc',
    'No',
    'De',
    'Ud',
    'Dd',
    'Td',
    'Qad',
    'Qid',
    'Sxd',
    'Spd',
    'Od',
    'Nd',
    'V',
    'Uv',
    'Dv',
    'Tv',
    'Qav',
    'Qiv',
    'Sxv',
    'Spv',
    'Ov',
    'Nv',
    'Tt'
  ]

  function prettifySub (number, places) {
    number = places > 0 ? fixedFloor(number, places) : Math.floor(number)
    return fixedFloor(number, places).toFixed(places)
  }

  function fixedFloor (number, places) {
    if (places === 0) return Math.floor(number)
    return Math.floor(number * Math.pow(10, places)) / Math.pow(10, places)
  }

  function formatNumber (number) {
    var places = 0
    if (number > 10000 || number < -10000) places = 1

    var numberTmp = number
    if (numberTmp < 0) return fixedFloor(number, places)
    numberTmp = Math.round(number * 1000000) / 1000000

    if (!isFinite(numberTmp)) return 'Infinite'
    if (numberTmp === 0) return prettifySub(0, places)
    if (numberTmp >= 1000 && numberTmp < 10000) return Math.floor(numberTmp)

    var base = Math.floor(Math.log(numberTmp) / Math.log(1000))
    if (base <= 0) return prettifySub(numberTmp, places)
    numberTmp /= Math.pow(1000, base)

    var suffix
    if (base <= suffices.length && base > 0) {
      suffix = suffices[base - 1]
    } else {
      var exponent = parseFloat(numberTmp).toExponential(2)
      exponent = exponent.replace('+', '')
      return exponent
    }
    if (numberTmp < 10) return prettifySub(numberTmp, 2) + suffix
    if (numberTmp < 100) return prettifySub(numberTmp, 1) + suffix
    return prettifySub(numberTmp, 0) + suffix
  }

  return formatNumber
})
