
module.exports = function makeMatch (matches) {
  if (!Array.isArray(matches)) {
    throw new Error('Match requires an array of matches')
  }

  return function match (value) {
    return matches
      .filter(([v, fn]) => {
        if (!fn) {
          return true
        }

        return typeof v === 'function'
          ? v(value)
          : v === value
      })
      .reduce((prev, [v, fn], index) => {
        if (index) {
          return prev
        }

        if (!fn) {
          return v(value)
        }

        return fn(value)
      }, null)
  }
}
