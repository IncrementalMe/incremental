define(function (require) {
  var settings = require('settings')
  var draw = require('draw')

  var lastTick = new Date().getTime()
  var deltaTime2 = 0
  var game

  function start (gameIn) {
    game = gameIn
    draw.start()
    window.requestAnimationFrame(loop)
  }

  function loop () {
    var now = new Date().getTime()
    var deltaTime = now - lastTick
    deltaTime2 += deltaTime
    lastTick = now

    if (deltaTime2 >= 1000 / settings.updatesPerSecond) {
      deltaTime2 -= 1000 / settings.updatesPerSecond

      Object.keys(game.buildings).forEach(key => {
        game.buildings[key].effects.forEach(effect => {
          effect.do(game)
        })
      })
      game.buttons.forEach(buttonObject => {
        buttonObject.update(game)
      })
    }
    draw.draw(game)
    window.requestAnimationFrame(loop)
  }

  return { start: start }
})
