define(function () {
  var ctx = null
  var wallet = null

  function start (walletIn) {
    wallet = walletIn

    ctx = document.getElementById('canvas').getContext('2d')
    ctx.canvas.setAttribute('width', 900)
    ctx.canvas.setAttribute('height', 650)

    ctx.images = {}
    ctx.images.farm_empty = document.createElement('img')
    ctx.images.farm_empty.src = './img/farm_empty.png'

    window.requestAnimationFrame(update)
  }

  function update () {
    draw(ctx)
    window.requestAnimationFrame(update)
  }

  function draw (ctx) {
    if (ctx === null) return

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Resources
    ctx.fillStyle = '#000'
    ctx.fillText('Gold: ' + wallet.gold.amount, 50, 50)
    ctx.fillText('Food: ' + wallet.food.amount, 50, 75)

    // Farm
    ctx.fillStyle = '#000'
    ctx.font = '26px monospace'
    ctx.fillText('Farm', 110, 570)
    ctx.drawImage(ctx.images.farm_empty, 40, 550, 60, 60)
  }

  return { start: start }
})
