define(function (require) {
  var formatNumber = require('lib/formatNumber')
  var Button = require('lib/Button')
  var sfx = require('lib/sfx')

  var farm = {
    name: 'farm',
    count: 0,
    defaultEffects: [
      {
        target: 'resources',
        resource: 'food',
        amount: -1
      }
    ],
    getCost: function () {
      var cost = 100
      return new Map([['food', cost]])
    },
    draw: function (game, ctx) {
      if (this.buttons.get('click').hover) {
        this.count++
      } else {
        this.count = 0
      }

      ctx.restore()
      this.buttons.get('click').fill = '#000'

      this.drawImage(game, ctx)

      if (this.amount === 0) {
        this.drawBuildTitle(game, ctx)
        this.drawPrice(game, ctx)
      } else {
        this.drawNormalTitle(game, ctx)
      }

      this.buttons.forEach(btt => {
        btt.draw(game, ctx)
      })
    },
    drawImage: function (game, ctx) {
      ctx.globalAlpha = 0.4
      if (this.amount > 0) ctx.globalAlpha = 1
      else if (this.buttons.get('click').hover) ctx.globalAlpha = 0.7
      ctx.drawImage(ctx.images.farm, 450 - 39, 513, 76, 76)
      ctx.globalAlpha = 1
    },
    drawBuildTitle: function (game, ctx) {
      ctx.restore()
      ctx.fillStyle = '#000'
      ctx.font = '22px monospace'
      ctx.textAlign = 'left'

      var hover = this.buttons.get('click').hover
      var canPay = game.resources.canPay(this.getCost())

      if (hover && canPay) {
        ctx.fillStyle = '#2a2'
        this.buttons.get('click').fill = '#2a2'
        sfx.happyDraw(ctx, 'Build Farm', 389, 506, this.count)
      } else {
        ctx.fillText('Build Farm', 389, 506)
      }
    },
    drawNormalTitle: function (game, ctx) {
      ctx.restore()
      ctx.fillStyle = '#000'
      ctx.font = '22px monospace'
      ctx.textAlign = 'left'

      ctx.fillText('Farm', 389, 506)
      ctx.textAlign = 'right'
      ctx.fillText(this.amount, 511, 506)
    },
    drawPrice: function (game, ctx) {
      ctx.restore()
      ctx.fillStyle = '#000'
      ctx.font = '20px monospace'
      ctx.textAlign = 'right'

      var cost = formatNumber(this.getCost().get('food'))
      ctx.fillText(cost, 450, 602)
      ctx.drawImage(ctx.images.food, 459, 586, 18, 18)
    }
  }

  var click = new Button({
    x: 450,
    y: 564,
    width: 120,
    height: 108,
    weight: 2,
    text: '',
    click: function (game) {
      if (game.buildings.farm.build(game, 1)) {
        this.click = function (game) {
          // open tech tree
        }
      }
    },
    hidden: false
  })

  farm.buttons = new Map([['click', click]])

  return farm
})
