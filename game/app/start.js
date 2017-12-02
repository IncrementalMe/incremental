define(function (require) {
  var draw = require('./draw.js')
  var ctx = document.getElementById('canvas').getContext('2d')

  ctx.canvas.setAttribute('width', 900)
  ctx.canvas.setAttribute('height', 650)

  function update () {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    draw.draw(ctx)
    window.requestAnimationFrame(update)
  }

  window.requestAnimationFrame(update)
})
