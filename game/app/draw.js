define(function (require) {
  return {
    centerText: function (ctx, text, y, xOffset = 0) {
      var measurement = ctx.measureText(text)
      var x = (ctx.canvas.width - measurement.width) / 2 + xOffset
      ctx.fillText(text, x, y)
    },

    draw: function (ctx) {
      var y = ctx.canvas.height / 2
      var color = 'rgb(0,0,0)'

      ctx.fillStyle = color
      ctx.font = '24px monospace'
      this.centerText(ctx, 'Test text', y - 30)
    }
  }
})
