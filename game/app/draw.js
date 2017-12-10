define(function () {
  var ctx

  function start (loop) {
    ctx = document.getElementById('canvas').getContext('2d')
    ctx.canvas.width = 900
    ctx.canvas.height = 650
    ctx.imageSmoothingEnabled = false

    ctx.images = {}
    ctx.images.farm_empty = document.createElement('img')
    ctx.images.farm_empty.src = './img/Andre/farm_empty.png'

    ctx.save()
    window.requestAnimationFrame(loop)
  }

  function draw (game) {
    if (ctx === null) return

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Resources
    ctx.fillStyle = '#000'
    ctx.font = '26px monospace'
    ctx.fillText('Gold: ' + Math.floor(game.wallet.gold.amount), 50, 50)
    ctx.fillText('Food: ' + Math.floor(game.wallet.food.amount), 50, 75)

    // Farm
    ctx.fillStyle = '#000'
    ctx.fillText('Farm ' + game.buildingWallet.farm.amount, 110, 570)
    ctx.drawImage(ctx.images.farm_empty, 40, 550, 64, 64)

    // Buttons
    game.buttons.forEach(button => {
      button.draw(ctx)
    })

    ctx.restore()
  }

  return { start: start, draw: draw }
})
