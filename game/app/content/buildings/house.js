define(function (require) {
  var Button = require('lib/Button')
  var Building = require('lib/Building')

  var house = new Building({
    name: 'house',
    visable: false,
    position: { x: 650, y: 560 },
    buildCost: new Map([['gold', 1]]),
    effects: [],
    buttons: new Map([]),
    logicTick: (game) => {}
  })

  var inputObj = {
    x: 650,
    y: 560,
    width: 120,
    height: 108,
    click: function (game) {
      var house = game.buildings.house

      if (house.build(game)) {
        this.topOnly = true
        this.hoverCondition = () => { return false }
        this.click = function (game) {
          // Open Tech Tree
        }
      }
    },
    hoverCondition: function (game) {
      return game.buildings.farm.canBuild(game)
    }
  }
  house.buttons.set('click', new Button(inputObj))

  return house
})
