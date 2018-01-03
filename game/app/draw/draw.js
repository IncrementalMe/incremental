define(function (require) {
  var formatNumber = require('lib/formatNumber')
  var ctxUtils = require('lib/ctxUtils')
  var ctx

  function start () {
    ctx = document.getElementById('canvas').getContext('2d')
    ctx.canvas.width = 900
    ctx.canvas.height = 650
    ctx.imageSmoothingEnabled = false

    ctx.images = {}
    createImage('img/Andre/farm.png')
    createImage('img/Andre/house.png')
    createImage('img/Andre/gold.png')
    createImage('img/Andre/food.png')
  }

  function createImage (src) {
    var fileName = src.replace(/^.*[\\/]/, '')
    fileName = fileName.replace(/[.].{3}/, '')
    ctx.images[fileName] = document.createElement('img')
    ctx.images[fileName].src = src
  }

  function draw (game) {
    if (ctx === null) return

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Resources
    ctx.fillStyle = '#000'
    ctx.textAlign = 'left'
    ctx.font = '26px monospace'

    ctxUtils.wrap(ctx, drawParts.food)(game)
    ctxUtils.wrap(ctx, drawParts.gold)(game)

    Object.keys(game.buildings).forEach(key => {
      game.buildings[key].draw(game, ctx)
    })

    game.settlement.drawObject.draw(game, ctx)
  }

  var drawParts = {
    food: function (game) {
      ctx.translate(ctx.canvas.width / 2 - 270, 0)

      ctx.strokeRect(0, 35, 40 + 71.4, 0)
      var text = formatNumber(game.wallet.food.amount)
      ctx.fillText(text, 38, 27)
      ctx.drawImage(ctx.images.food, 0, 4, 28, 28)

      // income
      var farm = game.buildings.farm
      if (farm.built) {
        ctx.fillStyle = '#888'
        ctx.font = '15px monospace'

        var value = farm.built * farm.effects[0].value.get('food')
        text = '+' + formatNumber(value) + ' /s'
        ctx.fillText(text, 61 - ctx.measureText(text).width / 2, 50)
      }
    },

    gold: function (game) {
      ctx.translate(ctx.canvas.width / 2 - 45, 0)

      ctx.strokeRect(0, 35, 40 + 71.47, 0)
      var text = formatNumber(game.wallet.gold.amount)
      ctx.fillText(text, 38, 28)
      ctx.drawImage(ctx.images.gold, 0, 4, 28, 28)
    }
  }

  return { start: start, draw: draw }
})
