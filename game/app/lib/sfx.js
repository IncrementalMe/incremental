define(function () {
  function happyDraw (ctx, text, x, y, count) {
    var pos = { x: x, y: y }
    text.split('').forEach(char => {
      var delta = Math.sin(pos.x + count / 13 + 62) * 9
      if (count < 30) {
        pos.y = y + delta / 30 * (10 * count / 10)
      } else {
        pos.y = y + delta
      }

      if (pos.y > y) pos.y = y
      ctx.fillText(char, pos.x, pos.y)
      pos.x += ctx.measureText(char).width
    })
  }

  return {happyDraw: happyDraw}
})
