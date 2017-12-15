define(function (require) {
  var Button = require('lib/Button')

  var farm = {
    farmDraw: require('content/buildings/farmDraw'),
    name: 'farm',
    count: 0,
    buttons: new Map([]),
    defaultEffects: [
      {
        target: 'resources',
        resource: 'food',
        amount: -1
      }
    ],
    getCost: function () {
      return new Map([['food', 100]])
    },
    draw: function (game, ctx) {
      this.farmDraw.draw(game, ctx)
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
      var farm = game.buildings.farm
      if (farm.build(game, 1)) {
        farm.buttons.get('click').topOnly = true
      }
    },
    hidden: false
  })
  farm.buttons.set('click', click)

  return farm
})
