define(function (require) {
  function draw (game, ctx) {
    if (this.hidden === false) {
      this.hover = this.onObject(game.mousePos)

      if (this.hover && this.hoverCondition(game)) {
        this.hoverCount += 1
        if (this.hoverStyle === 'green') {
          this.fill = '#2a2'
          ctx.fillStyle = '#2a2'
          ctx.globalAlpha = 0.1
          ctx.fillRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
          )
          ctx.globalAlpha = 1
        }
      } else {
        this.hoverCount = 0
      }

      var x = this.x - this.width / 2
      var y = this.y - this.height / 2

      ctx.font = '18px monospace'
      ctx.fillStyle = this.fill
      ctx.strokeStyle = this.fill
      ctx.lineWidth = this.weight

      if (this.topOnly) ctx.strokeRect(x, y, this.width + 1, 0)
      else ctx.strokeRect(x, y, this.width, this.height)
      ctx.fillText(this.text, x + 8, y + 21)

      this.fill = '#000'
    } else {
      this.hoverCount = 0
    }
  }

  return draw
})
