var assert = require('assert')
var day12 = require('../lib/day12.js')

describe('day12', function () {
  describe('day12.extractRulesArray - given an array of rules for plant expansion  ', function () {
    it('should return an array of the rules that result in a live plant', function () {
      var plantExpansionRules =
      [ '...## => #',
        '..... => .',
        '..#.. => #',
        '##### => .',
        '.#... => #',
        '.#.#. => #',
        '.#.## => #',
        '.##.. => #',
        '.#### => #',
        '....# => .',
        '#.... => .',
        '#.#.# => #',
        '#.### => #',
        '##.#. => #',
        '##.## => #',
        '###.. => #',
        '###.# => #',
        '####. => #' ]

      var rulesArray = day12.extractRulesArray(plantExpansionRules)

      var expectedArray =
      [ '...##',
        '..#..',
        '.#...',
        '.#.#.',
        '.#.##',
        '.##..',
        '.####',
        '#.#.#',
        '#.###',
        '##.#.',
        '##.##',
        '###..',
        '###.#',
        '####.' ]
      assert.strict.deepEqual(rulesArray, expectedArray)
    })
  })
  describe('day12.initializeGenerationArray - given a string representing the initial state of the plants in each pot', function () {
    it('should return an array of the initial state of the plants, including 4 empty pots beyond each end', function () {
      var initialPlants = 'initial state: #..#.#..##......###...###'
      var generationArray = day12.initializeGenerationArray(initialPlants)

      var expectedArray = [
        '.', '.', '.', '.', '#', '.', '.', '#', '.', '#', '.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '#', '#', '#', '.', '.', '.', '#', '#', '#', '.', '.', '.', '.'
      ]
      assert.strict.deepEqual(generationArray, expectedArray)
    })
  })
  describe('day12.initializeGenerationArray - given a string representing the initial state of the plants in each pot', function () {
    it('should return an array of the initial state of the plants, including 4 empty pots beyond each end', function () {
      var initialPlants = 'initial state: #..#.#..##......###...###'
      var generationArray = day12.initializeGenerationArray(initialPlants)

      var expectedArray = [
        '.', '.', '.', '.', '#', '.', '.', '#', '.', '#', '.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '#', '#', '#', '.', '.', '.', '#', '#', '#', '.', '.', '.', '.'
      ]
      assert.strict.deepEqual(generationArray, expectedArray)
    })
  })
})
