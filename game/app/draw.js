define(function (require) {
  var formatNumber = require('lib/formatNumber')
  var ctx

  function start () {
    ctx = document.getElementById('canvas').getContext('2d')
    ctx.canvas.width = 900
    ctx.canvas.height = 650
    ctx.imageSmoothingEnabled = false

    ctx.images = {}
    createImage('img/Andre/farm.png')
    createImage('img/Andre/gold.png')
    createImage('img/Andre/food.png')

    ctx.save()
  }

  function createImage (src) {
    var fileName = src.replace(/^.*[\\/]/, '')
    fileName = fileName.replace(/[.].{3}/, '')
    ctx.images[fileName] = document.createElement('img')
    ctx.images[fileName].src = src
  }

  function draw (game) {
    if (ctx === null) return
    var text = ''

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Resources
    ctx.fillStyle = '#000'
    ctx.font = '26px monospace'
    ctx.textAlign = 'left'

    text = formatNumber(game.resources.food.amount)
    ctx.fillText(text, ctx.canvas.width / 2 - 232, 27)
    ctx.drawImage(ctx.images.food, ctx.canvas.width / 2 - 270, 4, 28, 28)

    if (game.resources.gold.amount > 0) {
      text = formatNumber(game.resources.gold.amount)
      ctx.fillText(text, ctx.canvas.width / 2 - 7, 28)
      ctx.drawImage(ctx.images.gold, ctx.canvas.width / 2 - 45, 4, 28, 28)
    }

    Object.keys(game.buildings).forEach(key => {
      game.buildings[key].drawObject.draw(game, ctx)
    })
  }

  return { start: start, draw: draw }
})
