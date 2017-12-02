define(function (require) {
  var ctx = null

  function start () {
    ctx = document.getElementById('canvas').getContext('2d')
    ctx.canvas.setAttribute('width', 900)
    ctx.canvas.setAttribute('height', 650)

    ctx.images = {}
    ctx.images.farm_empty = document.createElement('img')
    ctx.images.farm_empty.src = ('./img/farm_empty.png')

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

    ctx.fillStyle = '#000'
    ctx.font = '26px monospace'
    ctx.fillText('Farm', 110, 570)

    ctx.drawImage(ctx.images.farm_empty, 40, 550, 60, 60)
  }

  return {start: start}
})
