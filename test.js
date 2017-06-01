
const test = require('tape')

const match = require('./')

const instance = struct => type => type instanceof struct

test('Type match', t => {
  t.plan(5)

  class Foo {}

  const e = {
    BAR: 'e:bar'
  }
  const matcher = match([
    ['FOO', value => {
      t.ok('Matches against a string')
    }],
    [e.BAR, value => {
      t.ok('Matches against object members')
    }],
    [1, value => {
      t.ok('Matches against an integer')
    }],
    [v => v > 10 && v < 100, v => {
      t.ok('Matches using a predicate function')
    }],
    [instance(Foo), v => {
      t.ok('Matches using a function')
    }]
  ])

  matcher('FOO')
  matcher(e.BAR)
  matcher(1)
  matcher(99)
  matcher(new Foo())
})

test('Match return', t => {
  t.plan(1)

  const matcher = match([
    [2, v => v * 2]
  ])

  const result = match(2)

  t.equal(result, 4, 'Match can be used as an assignment')
})
