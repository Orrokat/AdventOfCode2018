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
  describe('day12.doesThisPlantLive - given a string representing the current state of a single pot and 2 pots each direction from it and an array of rules', function () {
    it('should return a boolean indicating if this plant lives in the next generation', function () {
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
      var thisPlantLives = day12.doesThisPlantLive('...##', rulesArray)
      
      assert.strict.deepEqual(thisPlantLives, true)
    })
  })
  describe('day12.doesThisPlantLive - given a string representing the current state of a single pot and 2 pots each direction from it and an array of rules', function () {
    it('should return a boolean indicating if this plant lives in the next generation', function () {
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
      var thisPlantLives = day12.doesThisPlantLive('.....', rulesArray)
      
      assert.strict.deepEqual(thisPlantLives, false)
    })
  })
  describe('day12.nextGeneration - given an array representing the current generation and an array of rules', function () {
    it('should return a string representing the next generation', function () {
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
      var currentGenerationArray = [
        '.', '.', '.', '.', '#', '.', '.', '#', '.', '#', '.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '#', '#', '#', '.', '.', '.', '#', '#', '#', '.', '.', '.', '.'
      ]
      var expectedArray = [
        '.', '.', '.', '.', '#', '.', '.', '.', '#', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.'
      ]
      var nextGenerationArray = day12.nextGeneration(currentGenerationArray, rulesArray)
      
      assert.strict.deepEqual(nextGenerationArray, expectedArray)
    })
  })
  describe('day12.multipleGenerations - given an array representing the initial generation, an array of rules and the number of generations', function () {
    it('should return a string representing the final generation', function () {
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

      var numGenerations = 20
      var rulesArray = day12.extractRulesArray(plantExpansionRules)
      var initialGenerationArray = [
        '.', '.', '.', '.', '#', '.', '.', '#', '.', '#', '.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '#', '#', '#', '.', '.', '.', '#', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'
      ]
      var expectedArray = [
        '.', '.', '#', '.', '.', '.', '.', '#', '#', '.', '.', '.', '.', '#', '#', '#', '#', '#', '.', '.', '.', '#', '#', '#', '#', '#', '#', '#', '.', '.', '.', '.', '#', '.', '#', '.', '.', '#', '#', '.', '.', '.'
      ]
      var finalGenerationArray = day12.multipleGenerations(initialGenerationArray, rulesArray, numGenerations)
      
      assert.strict.deepEqual(finalGenerationArray, expectedArray)
    })
  })
})
