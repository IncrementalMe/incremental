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
    this.click = typeof input.click === 'undefined' ? () => {} : input.click
    this.hover = 0
  }

  Button.prototype.tryClick = function (game) {
    if (this.hidden === false && this.pointOnObject(game.mousePos)) {
      this.click(game)
    }
  }

  Button.prototype.draw = function (ctx) {
    if (this.hidden === false) {
      var x = this.x - this.width / 2
      var y = this.y - this.height / 2

      ctx.strokeRect(x, y, this.width, this.height)
      ctx.strokeStyle = this.color
      ctx.lineWidth = this.weight + this.hover

      ctx.fillStyle = this.color
      ctx.font = '18px monospace'
      ctx.fillText(this.text, x + 8, y + 21)
    }
  }

  Button.prototype.update = function (game) {
    if (this.pointOnObject(game.mousePos)) {
      this.hover = 1
    } else {
      this.hover = 0
    }
  }

  Button.prototype.pointOnObject = function (point) {
    var x = this.x - this.width / 2
    var y = this.y - this.height / 2
    if (point.x > x && point.x < x + this.width) {
      if (point.y > y && point.y < y + this.height) {
        return true
      }
    }
    return false
  }

  return Button
})
