define(function () {
  function Button (input) {
    this.x = typeof input.x === 'undefined' ? 0 : input.x
    this.y = typeof input.y === 'undefined' ? 0 : input.y
    this.width = typeof input.width === 'undefined' ? 62 : input.width
    this.height = typeof input.height === 'undefined' ? 30 : input.height
    this.weight = typeof input.weight === 'undefined' ? 2 : input.weight
    this.text = typeof input.text === 'undefined' ? '' : input.text
    this.color = typeof input.color === 'undefined' ? 'rgb(0,0,0)' : input.color
    this.hidden = typeof input.hidden === 'undefined' ? false : input.hidden

    this.onClick = typeof input.onClick === 'undefined'
      ? function () {}
      : input.onClick

    this.hover = 0
    this.clickCheck = function (game) {
      if (this.hidden === false && this.pointOnObject(game.mousePos)) {
        this.onClick(game)
      }
    }

    this.draw = function (ctx) {
      if (this.hidden === false) {
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.weight + this.hover
        ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)

        ctx.fillStyle = this.color
        ctx.font = '18px monospace'
        ctx.fillText(this.text, this.x + 8 - this.width / 2, this.y + 21 - this.height / 2)
      }
    }

    this.update = function (game) {
      if (this.pointOnObject(game.mousePos)) {
        this.hover = 1
      } else {
        this.hover = 0
      }
    }

    this.pointOnObject = function (point) {
      var bounds = {x: this.x - this.width / 2, y: this.y - this.height / 2}
      if (point.x > bounds.x && point.x < bounds.x + this.width) {
        if (point.y > bounds.y && point.y < bounds.y + this.height) {
          return true
        }
      }
      return false
    }
  }

  return Button
})
