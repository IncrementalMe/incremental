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
    if (tick.tick()) update()

    draw.draw(game)

    window.requestAnimationFrame(loop)
  }

  function update () {
    Object.keys(game.buildings).forEach(key => {
      game.buildings[key].effects.forEach(effect => {
        effect.do(game)
      })
    })
  }

  return { start: start }
})
