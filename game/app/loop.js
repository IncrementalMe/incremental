define(function (require) {
  var draw = require('draw')
  var fps = require('fps')

  var game

  function start (gameIn) {
    game = gameIn
    draw.start()
    fps.start()
    window.requestAnimationFrame(loop)
  }

  function loop () {
    if (fps.tick()) update()
    draw.draw(game)

    window.requestAnimationFrame(loop)
  }

  function update () {
    Object.keys(game.buildings).forEach(key => {
      game.buildings[key].effects.forEach(effect => {
        effect.do(game)
      })
    })
    game.buttons.forEach(buttonObject => {
      buttonObject.update(game)
    })
  }

  return { start: start }
})
