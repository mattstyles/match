
const test = require('tape')

const deepEqual = require('deep-equal')

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
      t.pass('Matches against a string')
    }],
    [e.BAR, value => {
      t.pass('Matches against object members')
    }],
    [1, value => {
      t.pass('Matches against an integer')
    }],
    [v => v > 10 && v < 100, v => {
      t.pass('Matches using a predicate function')
    }],
    [instance(Foo), v => {
      t.pass('Matches using a function')
    }],
    [v => deepEqual(v, {
      foo: 'bar'
    }), v => console.log('hello deep equal object')]
  ])

  matcher({foo: 'bar'})

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

  t.equal(matcher(2), 4, 'Match can be used as an assignment')
})

test('Catch all match', t => {
  t.plan(1)

  const matcher = match([
    ['foo', () => {}],
    [v => {
      t.pass('Catch all successful')
    }]
  ])

  matcher('foo')
  matcher('bar')
})
