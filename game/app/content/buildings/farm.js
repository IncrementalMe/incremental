define(function (require) {
  var Button = require('lib/Button')
  var Effect = require('lib/Effect')
  var Building = require('lib/Building')
  var settings = require('settings')

  var farm = new Building({
    name: 'farm',
    visable: true,
    buildCost: new Map([['food', 100]]),
    effects: [],
    buttons: new Map([]),
    logicTick: function (game) {
      if (this.built) {
        if (this.logicUpdates >= settings.ups) {
          this.sfx.createSprite('food', { x: 444, y: 546 })
          this.logicUpdates -= settings.ups
        }
        this.logicUpdates++
      }
    },
    logicUpdates: 0
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
    click: function (game) {
      var farm = game.buildings.farm

      if (farm.build(game)) {
        game.buildings.house.visable = true
        this.topOnly = true
        this.hoverCondition = () => {
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
