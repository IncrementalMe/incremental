define(function (require) {
  var Building = require('lib/Building')

  var buildings = {
    farm: new Building(require('content/buildings/farm'))
  }

  return buildings
})
