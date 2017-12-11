/* global requirejs */

requirejs.config({
  baseUrl: 'app',
  paths: {
    app: '../app'
  }
})

requirejs(['app/start'])
