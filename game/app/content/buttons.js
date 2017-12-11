define(function (require) {
  var Button = require('lib/Button')

  var buttons = [
    new Button({
      x: 450,
      y: 564,
      width: 120,
      height: 108,
      weight: 2,
      text: '',
      onClick: function (game) {
        game.buildings.farm.build(game, 1)
      },
      hidden: false
    })
  ]
  return buttons
})
