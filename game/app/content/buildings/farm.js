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
      var cost = 1 * Math.pow(10, this.amount)
      return new Map([['food', cost]])
    },
    draw: function (game, ctx) {
      if (this.buttons.get('build').hover) this.count++
      else this.count = 0

      ctx.restore()
      ctx.fillStyle = '#000'
      ctx.font = '22px monospace'
      ctx.textAlign = 'left'

      this.buttons.get('build').fill = '#000'

      ctx.drawImage(ctx.images.farm, 450 - 39, 513, 76, 76)
      this.drawTitle(game, ctx)
      this.drawPrice(game, ctx)
      this.buttons.forEach(btt => {
        btt.draw(game, ctx)
      })
    },
    drawTitle: function (game, ctx) {
      if (this.amount > 0) {
        this.drawNormalTitle(game, ctx)
      } else {
        this.drawBuildTitle(game, ctx)
      }
    },
    drawNormalTitle: function (game, ctx) {
      ctx.fillText('Farm', 389, 506)
      ctx.textAlign = 'right'
      ctx.fillText(this.amount, 511, 506)
    },
    drawBuildTitle: function (game, ctx) {
      var hover = this.buttons.get('build').hover
      var canPay = game.resources.canPay(this.getCost())

      if (hover && canPay) {
        ctx.fillStyle = '#2a2'
        sfx.happyDraw(ctx, 'Build Farm', 389, 506, this.count)
        this.buttons.get('build').fill = '#2a2'
      } else {
        ctx.fillText('Build Farm', 389, 506)
      }
    },
    drawPrice: function (game, ctx) {
      var cost = formatNumber(this.getCost().get('food'))

      ctx.font = '20px monospace'
      ctx.textAlign = 'right'
      ctx.fillText(cost, 450, 602)
      ctx.drawImage(ctx.images.food, 459, 586, 18, 18)
    }
  }

  var build = new Button({
    x: 450,
    y: 564,
    width: 120,
    height: 108,
    weight: 2,
    text: '',
    click: function (game) {
      game.buildings.farm.build(game, 1)
    },
    hidden: false
  })

  farm.buttons = new Map([['build', build]])

  return farm
})
