define(function (require) {
  var settings = require('settings')
  var lastTick
  var totalDeltaTime

  function start () {
    lastTick = new Date().getTime()
    totalDeltaTime = 0
  }

  function tick () {
    var now = new Date().getTime()
    var deltaTime = now - lastTick
    totalDeltaTime += deltaTime
    lastTick = now

    if (totalDeltaTime >= 1000 / settings.updatesPerSecond) {
      totalDeltaTime -= 1000 / settings.updatesPerSecond
      return true
    }
    return false
  }

  return { start: start, tick: tick }
})
