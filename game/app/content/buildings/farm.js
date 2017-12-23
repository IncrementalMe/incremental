define(function (require) {
  var Button = require('lib/Button')
  var Effect = require('lib/Effect')
  var Building = require('lib/Building')

  var farm = new Building({
    drawObject: require('content/buildings/farmDraw'),
    name: 'farm',
    buildCost: new Map([['food', 100]]),
    effects: [],
    buttons: new Map([])
  })

  var input = {
    type: 'income',
    value: new Map([['food', 1]])
  }
  farm.effects.push(new Effect(input, farm))

  input = {
    x: 450,
    y: 560,
    width: 120,
    height: 108,
    click: function (game) {
      var farm = game.buildings.farm

      if (farm.build(game)) {
        farm.buttons.get('click').topOnly = true
        this.click = function (game) {
          // Open Tech Tree
        }
      }
    },
    hidden: false
  }
  farm.buttons.set('click', new Button(input))

  return farm
})
