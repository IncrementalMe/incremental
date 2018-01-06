define(function (require) {
  var ctxUtils = require('draw/ctxUtils')
  var sfxHolder = []

  function draw (ctx) {
    sfxHolder.forEach(sfx => {
      ctxUtils.wrap(ctx, sfx.draw(ctx))
    })
  }

  function happyDraw (ctx, text, x, y, count) {
    var pos = { x: x, y: y }
    text.split('').forEach(char => {
      var delta = Math.sin(pos.x + count / 13 + 62) * 9
      if (count < 30) {
        pos.y = y + delta / 30 * (10 * count / 10)
      } else {
        pos.y = y + delta
      }

      if (pos.y > y) pos.y = y
      ctx.fillText(char, pos.x, pos.y)
      pos.x += ctx.measureText(char).width
    })
  }

  function Sprite (sprite, pos, speed, life) {
    this.sprite = sprite
    this.pos = pos
    this.speed = speed
    this.maxLife = life
    this.life = life
    this.direction = -135 + Math.random() * 90
    this.draw = function (ctx) {
      if (this.life < 1) {
        sfxHolder.slice(sfxHolder.indexOf(this), 1)
      } else {
        ctx.globalAlpha = 1 / this.maxLife * this.life
        ctx.drawImage(ctx.images[this.sprite], this.pos.x, this.pos.y, 17, 17)

        this.pos.x += Math.cos(this.direction / 360 * 2 * Math.PI)
        this.pos.y += Math.sin(this.direction / 360 * 2 * Math.PI)
        this.life--
      }
    }
  }

  function createSprite (sprite, pos, speed = 13, life = 53) {
    sfxHolder.push(new Sprite(sprite, pos, speed, life))
  }

  return {
    happyDraw: happyDraw,
    createSprite: createSprite,
    draw: draw
  }
})
