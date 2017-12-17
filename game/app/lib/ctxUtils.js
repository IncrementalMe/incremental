define(function () {
  function wrap (ctx, func) {
    return function () {
      ctx.save()
      func.apply(this, arguments)
      ctx.restore()
    }
  }

  return { wrap: wrap }
})
