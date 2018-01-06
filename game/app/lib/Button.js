define(function (require) {
  function Button (input) {
    this.x = typeof input.x === 'undefined' ? 0 : input.x
    this.y = typeof input.y === 'undefined' ? 0 : input.y
    this.width = typeof input.width === 'undefined' ? 62 : input.width
    this.height = typeof input.height === 'undefined' ? 30 : input.height
    this.weight = typeof input.weight === 'undefined' ? 2 : input.weight
    this.text = typeof input.text === 'undefined' ? '' : input.text
    this.hidden = typeof input.hidden === 'undefined' ? false : input.hidden
    this.click = typeof input.click === 'undefined' ? () => {} : input.click
    this.hoverCondition = typeof input.hoverCondition === 'undefined'
      ? () => {
        return true
      }
      : input.hoverCondition
    this.fill = '#000'
    this.topOnly = false
    this.hover = false
    this.hoverCount = 0
    this.hoverStyle = 'green'
  }

  Button.prototype.tryClick = function (game) {
    if (this.hidden === false && this.onObject(game.mousePos)) {
      this.click(game)
    }
  }

  Button.prototype.draw = require('draw/buttonDraw')
  console.log(Button.draw)

  Button.prototype.onObject = function (point) {
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
