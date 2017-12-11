define(function (require) {
  var ctx
  var formatNumber = require('formatNumber')

  function start (loop) {
    ctx = document.getElementById('canvas').getContext('2d')
    ctx.canvas.width = 900
    ctx.canvas.height = 650
    ctx.imageSmoothingEnabled = false

    ctx.images = {}
    createImage('./img/Andre/farm.png')
    createImage('./img/Andre/gold.png')
    createImage('./img/Andre/food.png')

    ctx.save()
    window.requestAnimationFrame(loop)
  }

  function createImage (src) {
    var fileName = src.replace(/^.*[\\/]/, '')
    fileName = fileName.replace(/[.].{3}/, '')
    ctx.images[fileName] = document.createElement('img')
    ctx.images[fileName].src = src
  }

  function draw (game) {
    if (ctx === null) return

    var text

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Resources
    ctx.fillStyle = '#000'
    ctx.font = '26px monospace'
    ctx.textAlign = 'left'

    text = formatNumber(game.wallet.food.amount, 0)
    ctx.fillText(text, ctx.canvas.width / 2 - 232, 27)
    ctx.drawImage(ctx.images.food, ctx.canvas.width / 2 - 270, 4, 28, 28)

    if (game.wallet.gold.amount < 0) {
      text = formatNumber(game.wallet.gold.amount, 1)
      ctx.fillText(text, ctx.canvas.width / 2 - 7, 28)
      ctx.drawImage(ctx.images.gold, ctx.canvas.width / 2 - 45, 4, 28, 28)
    }

    // Farm
    ctx.font = '22px monospace'
    if (game.buildingWallet.farm.amount > 0) {
      ctx.fillText('Farm', 389, 506)
      ctx.textAlign = 'right'
      ctx.fillText(game.buildingWallet.farm.amount, 511, 506)
    } else {
      ctx.fillText('Build Farm', 389, 506)
    }
    ctx.drawImage(ctx.images.farm, 450 - 39, 513, 76, 76)
    ctx.font = '20px monospace'

    ctx.textAlign = 'right'
    text = formatNumber(game.buildingWallet.farm.getCost().get('food'))
    ctx.fillText(text, 450, 602)
    ctx.drawImage(ctx.images.food, 459, 586, 18, 18)

    // Buttons
    game.buttons.forEach(button => {
      button.draw(ctx)
    })

    ctx.restore()
  }

  return { start: start, draw: draw }
})
