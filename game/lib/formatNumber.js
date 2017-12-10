define(function () {
  function prettifySub (number) {
    number = parseFloat(number.toFixed(3))
    if (number >= 1000) number = 999
    number = number.toString()
    var hasDecimal = number.split('.')
    if (typeof hasDecimal[1] === 'undefined' || hasDecimal[0].length >= 3) {
      return number.substring(0, 3)
    }
    return number.substring(0, 4)
  }

  function formatNumber (number) {
    var numberTmp = number

    if (numberTmp < 0) return number.toFixed(3)

    number = Math.round(number * 1000000) / 1000000

    if (!isFinite(number)) return 'Infinite'
    if (number >= 1000 && number < 10000) return Math.floor(number)
    if (number === 0) return prettifySub(0)

    var base = Math.floor(Math.log(number) / Math.log(1000))
    if (base <= 0) return prettifySub(number)
    number /= Math.pow(1000, base)

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
    var suffix
    if (base <= suffices.length && base > 0) {
      suffix = suffices[base - 1]
    } else {
      var exponent = parseFloat(numberTmp).toExponential(2)
      exponent = exponent.replace('+', '')
      return exponent
    }
    return prettifySub(number) + suffix
  }

  return formatNumber
})
