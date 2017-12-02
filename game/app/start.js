define(function (require) {
  var draw = require('./draw.js')
  var ctx = document.getElementById('canvas').getContext('2d')

  function update () {
    draw(ctx)
    window.requestAnimationFrame(update)
  }

  window.requestAnimationFrame(update)
})
