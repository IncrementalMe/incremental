define(function () {
  function start (game) {
    var canvas = document.getElementById('canvas')
    var canvasRect = canvas.getBoundingClientRect()

    canvas.addEventListener(
      'click',
      function (e) {
        game.mousePos.x = e.clientX - canvasRect.left
        game.mousePos.y = e.clientY - canvasRect.top

        Object.keys(game.buildings).forEach(key => {
          game.buildings[key].buttons.forEach(btt => {
            btt.tryClick(game)
          })
        })
      },
      false
    )

    canvas.addEventListener(
      'mousemove',
      function (e) {
        game.mousePos.x = e.clientX - canvasRect.left
        game.mousePos.y = e.clientY - canvasRect.top
      },
      false
    )
  }

  return { start: start }
})
