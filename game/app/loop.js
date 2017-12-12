define(function (require) {
  var draw = require('draw')
  var tick = require('tick')

  var game

  function start (gameIn) {
    game = gameIn
    draw.start()
    tick.start()
    window.requestAnimationFrame(loop)
  }

  function loop () {
    update(tick.tick())
    draw.draw(game)
    window.requestAnimationFrame(loop)
  }

  function update (ticks) {
    if (ticks > 0) {
      Object.keys(game.buildings).forEach(key => {
        game.buildings[key].effects.forEach(effect => {
          effect.do(game, ticks)
        })
      })
    }
  }

  return { start: start }
})
