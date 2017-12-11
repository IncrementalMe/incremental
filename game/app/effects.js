define(function (require) {
  var Effect = require('lib/Effect')

  function setup (game, building) {
    if (typeof building.defaultEffects !== 'undefined') {
      var initialized = []

      building.defaultEffects.forEach(preEffect => {
        preEffect.parent = building
        initialized.push(new Effect(game, preEffect))
      })
      building.effects = initialized
    }
  }

  return {
    initializeBuildingEffects: function (game) {
      var target = game.buildings
      Object.keys(target).forEach(key => {
        setup(game, game.buildings[key])
      })
    }
  }
})
