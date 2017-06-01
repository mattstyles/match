
const predicate = (condition, value) => typeof condition === 'function'
  ? condition(value)
  : condition === value

const arm = (fn, value) => typeof fn === 'function'
  ? fn(value)
  : fn

module.exports = function makeMatch (matches) {
  if (!Array.isArray(matches)) {
    throw new Error('Match requires an array of matches')
  }

  return function match (value) {
    return matches
      .filter(([condition, fn]) => {
        return !fn
          ? true
          : predicate(condition, value)
      })
      .reduce((prev, [condition, fn], index) => {
        return index
          ? prev
          : arm(!fn ? condition : fn, value)
      }, null)
  }
}
