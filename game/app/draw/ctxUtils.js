define(function () {
  function wrap (ctx, func) {
    return function () {
      ctx.save()
      func.apply(this, arguments)
      ctx.globalAlpha = 1
      ctx.restore()
    }
  }

  return { wrap: wrap }
})
