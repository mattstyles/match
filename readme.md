
# match

> Pattern matching algorithm

[![Build Status](https://travis-ci.org/mattstyles/@mattstyles/match.svg?branch=composer)](https://travis-ci.org/mattstyles/@mattstyles/match)
[![npm version](https://badge.fury.io/js/@mattstyles/match.svg)](https://badge.fury.io/js/@mattstyles/match)
[![Dependency Status](https://david-dm.org/mattstyles/@mattstyles/match.svg)](https://david-dm.org/mattstyles/@mattstyles/match)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Install

Install with [npm](https://npmjs.com)

```sh
$ npm i -S @mattstyles/match
```

## Example

```js
const match = require('@mattstyles/match')
```

## Usage

`Match` implements a simple pattern matching mechanism, heavily inspired by [Rust’s match](https://doc.rust-lang.org/book/match.html) keyword.

```js
const match = require('@mattstyles/match')

const log = prefix => value => console.log(`${prefix}${value}`)

const matcher = match([
  ['FOO', log('::')],
  ['BAR', log('> ')]
])

matcher('FOO')
// ::FOO

matcher('BAR')
// > BAR
```

`Match` can be used to simplify complex branching logic and `if/then` soup.

## Matching on all the things

`Match` will attempt a strict equality check (`===`) on your match conditions which means that strings and integers are trivial to use, even matching on the same object is possible as match accepts an array of tuples of the form <any, function>.

```js
const obj = {foo: 'bar'}

const matcher = match([
  ['FOO', log()],
  [23, log()],
  [obj, log()]
])

// Even this would match
matcher(obj)
```

The wise will know that JS pattern matching capabilities and type system aren’t particularly helpful to our goal and the eagle eyed will notice that in the above example it will only match against the _exact_ same object, not an instance that merely _looks_ identical.

Thankfully JS isn’t totally hapless and many problems can be solved by the humble function (sometimes at the expense of brevity or clarity). `Match` can accept a predicate function to use as a match condition:

```js
const deepEqual = require('deep-equal')

const equal = predicate => value => deepEqual(predicate, value)

const matcher = match([
  [equal({foo: 'bar'}), log()]
])

matcher({
  foo: 'bar'
})
```

Rather than duck-typing you could go a step further with this and use `instanceof` checks if you really wanted:

```js
const instance = struct => type => type instanceof struct

class Foo {}

const matcher = match([
  [instance(Foo), log()]
])

matcher(new Foo())
```

## Exhaustive matching

JS can’t do work out if you’ve supplied enough conditions to be exhaustive but `match` will accept a lone function to use as a catch-all:

```js
const matcher = match([
  ['foo', log('::')],
  [log('Caught it: ')]
])

matcher('foo')
// ::foo

matcher('bar')
// Caught it: bar
```

## Assignment

`Match` will spit out whatever the conditional functions return and so can also be used for assignment:

```js
const matcher = match([
  [10, 'the same as']
  [v => v < 10, 'lower than'],
  [v => v > 10, 'higher than']
])

const return = match(4)

console.log(`4 is ${return} 10`)
// 4 is lower than 10
```

## Running tests

```sh
$ npm install
$ npm test
```

## Contributing

Pull requests are always welcome, the project uses the [standard](http://standardjs.com) code style. Please run `npm test` to ensure all tests are passing and add tests for any new features or updates.

For bugs and feature requests, [please create an issue](https://github.com/mattstyles/match/issues).

## License

MIT
