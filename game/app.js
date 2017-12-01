/* global requirejs */

requirejs.config({
  baseUrl: 'lib',
  paths: {
    app: '../app'
  }
})

requirejs(['app/start'])
