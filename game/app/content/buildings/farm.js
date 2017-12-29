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

  var inputObj = {
    type: 'income',
    value: new Map([['food', 1]])
  }
  farm.effects.push(new Effect(inputObj, farm))

  inputObj = {
    x: 450,
    y: 560,
    width: 120,
    height: 108,
    hidden: false,
    click: function (game) {
      var farm = game.buildings.farm

      if (farm.build(game)) {
        this.topOnly = true
        this.hoverCondition = function (game) {
          return false
        }
        this.click = function (game) {
          // Open Tech Tree
        }
      }
    },
    hoverCondition: function (game) {
      return game.buildings.farm.canBuild(game)
    }
  }
  farm.buttons.set('click', new Button(inputObj))

  return farm
})
