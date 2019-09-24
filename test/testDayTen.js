var assert = require('assert')
var dayTen = require('../lib/dayTen.js')

describe('dayTen', function () {
  describe('dayTen.parseData - given an array of position/velocity records  ', function () {
    it('should return an array of objects with numeric x, y coordinates for position and velocity', function () {
      var positionVelocityArray = [
        'position=< 9,  1> velocity=< 0,  2>',
        'position=< 7,  0> velocity=<-1,  0>',
        'position=< 3, -2> velocity=<-1,  1>',
        'position=< 6, 10> velocity=<-2, -1>',
        'position=< 2, -4> velocity=< 2,  2>',
        'position=<-6, 10> velocity=< 2, -2>',
        'position=< 1,  8> velocity=< 1, -1>',
        'position=< 1,  7> velocity=< 1,  0>',
        'position=<-3, 11> velocity=< 1, -2>',
        'position=< 7,  6> velocity=<-1, -1>',
        'position=<-2,  3> velocity=< 1,  0>',
        'position=<-4,  3> velocity=< 2,  0>',
        'position=<10, -3> velocity=<-1,  1>',
        'position=< 5, 11> velocity=< 1, -2>',
        'position=< 4,  7> velocity=< 0, -1>',
        'position=< 8, -2> velocity=< 0,  1>',
        'position=<15,  0> velocity=<-2,  0>',
        'position=< 1,  6> velocity=< 1,  0>',
        'position=< 8,  9> velocity=< 0, -1>',
        'position=< 3,  3> velocity=<-1,  1>',
        'position=< 0,  5> velocity=< 0, -1>',
        'position=<-2,  2> velocity=< 2,  0>',
        'position=< 5, -2> velocity=< 1,  2>',
        'position=< 1,  4> velocity=< 2,  1>',
        'position=<-2,  7> velocity=< 2, -2>',
        'position=< 3,  6> velocity=<-1, -1>',
        'position=< 5,  0> velocity=< 1,  0>',
        'position=<-6,  0> velocity=< 2,  0>',
        'position=< 5,  9> velocity=< 1, -2>',
        'position=<14,  7> velocity=<-2,  0>',
        'position=<-3,  6> velocity=< 2, -1>'
      ]

      var expextedPositionVelocityObjectArray = [
        { posX: 9, posY: 1, velX: 0, velY: 2 },
        { posX: 7, posY: 0, velX: -1, velY: 0 },
        { posX: 3, posY: -2, velX: -1, velY: 1 },
        { posX: 6, posY: 10, velX: -2, velY: -1 },
        { posX: 2, posY: -4, velX: 2, velY: 2 },
        { posX: -6, posY: 10, velX: 2, velY: -2 },
        { posX: 1, posY: 8, velX: 1, velY: -1 },
        { posX: 1, posY: 7, velX: 1, velY: 0 },
        { posX: -3, posY: 11, velX: 1, velY: -2 },
        { posX: 7, posY: 6, velX: -1, velY: -1 },
        { posX: -2, posY: 3, velX: 1, velY: 0 },
        { posX: -4, posY: 3, velX: 2, velY: 0 },
        { posX: 10, posY: -3, velX: -1, velY: 1 },
        { posX: 5, posY: 11, velX: 1, velY: -2 },
        { posX: 4, posY: 7, velX: 0, velY: -1 },
        { posX: 8, posY: -2, velX: 0, velY: 1 },
        { posX: 15, posY: 0, velX: -2, velY: 0 },
        { posX: 1, posY: 6, velX: 1, velY: 0 },
        { posX: 8, posY: 9, velX: 0, velY: -1 },
        { posX: 3, posY: 3, velX: -1, velY: 1 },
        { posX: 0, posY: 5, velX: 0, velY: -1 },
        { posX: -2, posY: 2, velX: 2, velY: 0 },
        { posX: 5, posY: -2, velX: 1, velY: 2 },
        { posX: 1, posY: 4, velX: 2, velY: 1 },
        { posX: -2, posY: 7, velX: 2, velY: -2 },
        { posX: 3, posY: 6, velX: -1, velY: -1 },
        { posX: 5, posY: 0, velX: 1, velY: 0 },
        { posX: -6, posY: 0, velX: 2, velY: 0 },
        { posX: 5, posY: 9, velX: 1, velY: -2 },
        { posX: 14, posY: 7, velX: -2, velY: 0 },
        { posX: -3, posY: 6, velX: 2, velY: -1 }
      ]

      var positionVelocityObjectArray = dayTen.parseData(positionVelocityArray)

      assert.deepStrictEqual(positionVelocityObjectArray, expextedPositionVelocityObjectArray)
    })
  })
  describe('dayTen.findDimensions - given an array of position/velocity objects  ', function () {
    it('should return an object with array details', function () {
      var positionVelocityObjectArray = [
        { posX: 9, posY: 1, velX: 0, velY: 2 },
        { posX: 7, posY: 0, velX: -1, velY: 0 },
        { posX: 3, posY: -2, velX: -1, velY: 1 },
        { posX: 6, posY: 10, velX: -2, velY: -1 },
        { posX: 2, posY: -4, velX: 2, velY: 2 },
        { posX: -6, posY: 10, velX: 2, velY: -2 },
        { posX: 1, posY: 8, velX: 1, velY: -1 },
        { posX: 1, posY: 7, velX: 1, velY: 0 },
        { posX: -3, posY: 11, velX: 1, velY: -2 },
        { posX: 7, posY: 6, velX: -1, velY: -1 },
        { posX: -2, posY: 3, velX: 1, velY: 0 },
        { posX: -4, posY: 3, velX: 2, velY: 0 },
        { posX: 10, posY: -3, velX: -1, velY: 1 },
        { posX: 5, posY: 11, velX: 1, velY: -2 },
        { posX: 4, posY: 7, velX: 0, velY: -1 },
        { posX: 8, posY: -2, velX: 0, velY: 1 },
        { posX: 15, posY: 0, velX: -2, velY: 0 },
        { posX: 1, posY: 6, velX: 1, velY: 0 },
        { posX: 8, posY: 9, velX: 0, velY: -1 },
        { posX: 3, posY: 3, velX: -1, velY: 1 },
        { posX: 0, posY: 5, velX: 0, velY: -1 },
        { posX: -2, posY: 2, velX: 2, velY: 0 },
        { posX: 5, posY: -2, velX: 1, velY: 2 },
        { posX: 1, posY: 4, velX: 2, velY: 1 },
        { posX: -2, posY: 7, velX: 2, velY: -2 },
        { posX: 3, posY: 6, velX: -1, velY: -1 },
        { posX: 5, posY: 0, velX: 1, velY: 0 },
        { posX: -6, posY: 0, velX: 2, velY: 0 },
        { posX: 5, posY: 9, velX: 1, velY: -2 },
        { posX: 14, posY: 7, velX: -2, velY: 0 },
        { posX: -3, posY: 6, velX: 2, velY: -1 }
      ]

      var expectedArrayObject = { minX: -6, maxX: 15, minY: -4, maxY: 11, width: 22, height: 16 }

      var arrayObject = dayTen.findDimensions(positionVelocityObjectArray)

      assert.deepStrictEqual(arrayObject, expectedArrayObject)
    })
  })

  describe('dayTen.findDimensions - given an array object  ', function () {
    it('should return an array with the given dimensions and a "." in each cell', function () {
      var arrayObject = { minX: -6, maxX: 15, minY: -4, maxY: 11, width: 22, height: 16 }

      var pointOfLightArray = dayTen.createBlankArray(arrayObject)
      var expectedArray = [
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
      ]

      assert.deepStrictEqual(pointOfLightArray, expectedArray)
    })
  })

  describe('dayTen.populateArray - given an array of position/velocity objects  ', function () {
    it('should return an array with the points of light populated', function () {
      var positionVelocityObjectArray = [
        { posX: 9, posY: 1, velX: 0, velY: 2 },
        { posX: 7, posY: 0, velX: -1, velY: 0 },
        { posX: 3, posY: -2, velX: -1, velY: 1 },
        { posX: 6, posY: 10, velX: -2, velY: -1 },
        { posX: 2, posY: -4, velX: 2, velY: 2 },
        { posX: -6, posY: 10, velX: 2, velY: -2 },
        { posX: 1, posY: 8, velX: 1, velY: -1 },
        { posX: 1, posY: 7, velX: 1, velY: 0 },
        { posX: -3, posY: 11, velX: 1, velY: -2 },
        { posX: 7, posY: 6, velX: -1, velY: -1 },
        { posX: -2, posY: 3, velX: 1, velY: 0 },
        { posX: -4, posY: 3, velX: 2, velY: 0 },
        { posX: 10, posY: -3, velX: -1, velY: 1 },
        { posX: 5, posY: 11, velX: 1, velY: -2 },
        { posX: 4, posY: 7, velX: 0, velY: -1 },
        { posX: 8, posY: -2, velX: 0, velY: 1 },
        { posX: 15, posY: 0, velX: -2, velY: 0 },
        { posX: 1, posY: 6, velX: 1, velY: 0 },
        { posX: 8, posY: 9, velX: 0, velY: -1 },
        { posX: 3, posY: 3, velX: -1, velY: 1 },
        { posX: 0, posY: 5, velX: 0, velY: -1 },
        { posX: -2, posY: 2, velX: 2, velY: 0 },
        { posX: 5, posY: -2, velX: 1, velY: 2 },
        { posX: 1, posY: 4, velX: 2, velY: 1 },
        { posX: -2, posY: 7, velX: 2, velY: -2 },
        { posX: 3, posY: 6, velX: -1, velY: -1 },
        { posX: 5, posY: 0, velX: 1, velY: 0 },
        { posX: -6, posY: 0, velX: 2, velY: 0 },
        { posX: 5, posY: 9, velX: 1, velY: -2 },
        { posX: 14, posY: 7, velX: -2, velY: 0 },
        { posX: -3, posY: 6, velX: 2, velY: -1 }
      ]

      var expectedArray = [
        ['.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '#', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '#', '.', '#', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '#', '.', '.', '.', '#', '.', '#', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
      ]
      var arrayObject = dayTen.findDimensions(positionVelocityObjectArray)
      var pointArray = dayTen.populateArray(positionVelocityObjectArray, arrayObject)

      assert.deepStrictEqual(pointArray, expectedArray)
    })
  })

  describe('dayTen.renderDisplay - given an array of position/velocity objects  ', function () {
    it('should return a string representing the relative positions of the points of light', function () {
      var positionVelocityObjectArray = [
        { posX: 9, posY: 1, velX: 0, velY: 2 },
        { posX: 7, posY: 0, velX: -1, velY: 0 },
        { posX: 3, posY: -2, velX: -1, velY: 1 },
        { posX: 6, posY: 10, velX: -2, velY: -1 },
        { posX: 2, posY: -4, velX: 2, velY: 2 },
        { posX: -6, posY: 10, velX: 2, velY: -2 },
        { posX: 1, posY: 8, velX: 1, velY: -1 },
        { posX: 1, posY: 7, velX: 1, velY: 0 },
        { posX: -3, posY: 11, velX: 1, velY: -2 },
        { posX: 7, posY: 6, velX: -1, velY: -1 },
        { posX: -2, posY: 3, velX: 1, velY: 0 },
        { posX: -4, posY: 3, velX: 2, velY: 0 },
        { posX: 10, posY: -3, velX: -1, velY: 1 },
        { posX: 5, posY: 11, velX: 1, velY: -2 },
        { posX: 4, posY: 7, velX: 0, velY: -1 },
        { posX: 8, posY: -2, velX: 0, velY: 1 },
        { posX: 15, posY: 0, velX: -2, velY: 0 },
        { posX: 1, posY: 6, velX: 1, velY: 0 },
        { posX: 8, posY: 9, velX: 0, velY: -1 },
        { posX: 3, posY: 3, velX: -1, velY: 1 },
        { posX: 0, posY: 5, velX: 0, velY: -1 },
        { posX: -2, posY: 2, velX: 2, velY: 0 },
        { posX: 5, posY: -2, velX: 1, velY: 2 },
        { posX: 1, posY: 4, velX: 2, velY: 1 },
        { posX: -2, posY: 7, velX: 2, velY: -2 },
        { posX: 3, posY: 6, velX: -1, velY: -1 },
        { posX: 5, posY: 0, velX: 1, velY: 0 },
        { posX: -6, posY: 0, velX: 2, velY: 0 },
        { posX: 5, posY: 9, velX: 1, velY: -2 },
        { posX: 14, posY: 7, velX: -2, velY: 0 },
        { posX: -3, posY: 6, velX: 2, velY: -1 }
      ]

      var expextedDisplayString =
            '\n' + '\n' +
            '  ........#.............  ' + '\n' +
            '  ................#.....  ' + '\n' +
            '  .........#.#..#.......  ' + '\n' +
            '  ......................  ' + '\n' +
            '  #..........#.#.......#  ' + '\n' +
            '  ...............#......  ' + '\n' +
            '  ....#.................  ' + '\n' +
            '  ..#.#....#............  ' + '\n' +
            '  .......#..............  ' + '\n' +
            '  ......#...............  ' + '\n' +
            '  ...#...#.#...#........  ' + '\n' +
            '  ....#..#..#.........#.  ' + '\n' +
            '  .......#..............  ' + '\n' +
            '  ...........#..#.......  ' + '\n' +
            '  #...........#.........  ' + '\n' +
            '  ...#.......#..........  ' + '\n' + '\n'

      var displayString = dayTen.renderDisplay(positionVelocityObjectArray)

      assert.deepStrictEqual(displayString, expextedDisplayString)
    })
  })
  describe('dayTen.advanceLights - given an array of position/velocity objects  and number of seconds to advance', function () {
    it('should return an array of position/velocity objects advanced the given number of seconds', function () {
      var positionVelocityObjectArray = [
        { posX: 9, posY: 1, velX: 0, velY: 2 },
        { posX: 7, posY: 0, velX: -1, velY: 0 },
        { posX: 3, posY: -2, velX: -1, velY: 1 },
        { posX: 6, posY: 10, velX: -2, velY: -1 },
        { posX: 2, posY: -4, velX: 2, velY: 2 },
        { posX: -6, posY: 10, velX: 2, velY: -2 },
        { posX: 1, posY: 8, velX: 1, velY: -1 },
        { posX: 1, posY: 7, velX: 1, velY: 0 },
        { posX: -3, posY: 11, velX: 1, velY: -2 },
        { posX: 7, posY: 6, velX: -1, velY: -1 },
        { posX: -2, posY: 3, velX: 1, velY: 0 },
        { posX: -4, posY: 3, velX: 2, velY: 0 },
        { posX: 10, posY: -3, velX: -1, velY: 1 },
        { posX: 5, posY: 11, velX: 1, velY: -2 },
        { posX: 4, posY: 7, velX: 0, velY: -1 },
        { posX: 8, posY: -2, velX: 0, velY: 1 },
        { posX: 15, posY: 0, velX: -2, velY: 0 },
        { posX: 1, posY: 6, velX: 1, velY: 0 },
        { posX: 8, posY: 9, velX: 0, velY: -1 },
        { posX: 3, posY: 3, velX: -1, velY: 1 },
        { posX: 0, posY: 5, velX: 0, velY: -1 },
        { posX: -2, posY: 2, velX: 2, velY: 0 },
        { posX: 5, posY: -2, velX: 1, velY: 2 },
        { posX: 1, posY: 4, velX: 2, velY: 1 },
        { posX: -2, posY: 7, velX: 2, velY: -2 },
        { posX: 3, posY: 6, velX: -1, velY: -1 },
        { posX: 5, posY: 0, velX: 1, velY: 0 },
        { posX: -6, posY: 0, velX: 2, velY: 0 },
        { posX: 5, posY: 9, velX: 1, velY: -2 },
        { posX: 14, posY: 7, velX: -2, velY: 0 },
        { posX: -3, posY: 6, velX: 2, velY: -1 }
      ]

      var moveForward = 3

      var expectedPositionVelocityObjectArray = [
        { posX: 9, posY: 7, velX: 0, velY: 2 },
        { posX: 4, posY: 0, velX: -1, velY: 0 },
        { posX: 0, posY: 1, velX: -1, velY: 1 },
        { posX: 0, posY: 7, velX: -2, velY: -1 },
        { posX: 8, posY: 2, velX: 2, velY: 2 },
        { posX: 0, posY: 4, velX: 2, velY: -2 },
        { posX: 4, posY: 5, velX: 1, velY: -1 },
        { posX: 4, posY: 7, velX: 1, velY: 0 },
        { posX: 0, posY: 5, velX: 1, velY: -2 },
        { posX: 4, posY: 3, velX: -1, velY: -1 },
        { posX: 1, posY: 3, velX: 1, velY: 0 },
        { posX: 2, posY: 3, velX: 2, velY: 0 },
        { posX: 7, posY: 0, velX: -1, velY: 1 },
        { posX: 8, posY: 5, velX: 1, velY: -2 },
        { posX: 4, posY: 4, velX: 0, velY: -1 },
        { posX: 8, posY: 1, velX: 0, velY: 1 },
        { posX: 9, posY: 0, velX: -2, velY: 0 },
        { posX: 4, posY: 6, velX: 1, velY: 0 },
        { posX: 8, posY: 6, velX: 0, velY: -1 },
        { posX: 0, posY: 6, velX: -1, velY: 1 },
        { posX: 0, posY: 2, velX: 0, velY: -1 },
        { posX: 4, posY: 2, velX: 2, velY: 0 },
        { posX: 8, posY: 4, velX: 1, velY: 2 },
        { posX: 7, posY: 7, velX: 2, velY: 1 },
        { posX: 4, posY: 1, velX: 2, velY: -2 },
        { posX: 0, posY: 3, velX: -1, velY: -1 },
        { posX: 8, posY: 0, velX: 1, velY: 0 },
        { posX: 0, posY: 0, velX: 2, velY: 0 },
        { posX: 8, posY: 3, velX: 1, velY: -2 },
        { posX: 8, posY: 7, velX: -2, velY: 0 },
        { posX: 3, posY: 3, velX: 2, velY: -1 } ]

      dayTen.advanceLights(positionVelocityObjectArray, moveForward)

      assert.deepStrictEqual(positionVelocityObjectArray, expectedPositionVelocityObjectArray)
    })
  })
  describe('dayTen.advanceLights - given an array of position/velocity objects  ', function () {
    it('should return a string representing the relative positions of the points of light', function () {
      var positionVelocityObjectArray = [
        { posX: 9, posY: 7, velX: 0, velY: 2 },
        { posX: 4, posY: 0, velX: -1, velY: 0 },
        { posX: 0, posY: 1, velX: -1, velY: 1 },
        { posX: 0, posY: 7, velX: -2, velY: -1 },
        { posX: 8, posY: 2, velX: 2, velY: 2 },
        { posX: 0, posY: 4, velX: 2, velY: -2 },
        { posX: 4, posY: 5, velX: 1, velY: -1 },
        { posX: 4, posY: 7, velX: 1, velY: 0 },
        { posX: 0, posY: 5, velX: 1, velY: -2 },
        { posX: 4, posY: 3, velX: -1, velY: -1 },
        { posX: 1, posY: 3, velX: 1, velY: 0 },
        { posX: 2, posY: 3, velX: 2, velY: 0 },
        { posX: 7, posY: 0, velX: -1, velY: 1 },
        { posX: 8, posY: 5, velX: 1, velY: -2 },
        { posX: 4, posY: 4, velX: 0, velY: -1 },
        { posX: 8, posY: 1, velX: 0, velY: 1 },
        { posX: 9, posY: 0, velX: -2, velY: 0 },
        { posX: 4, posY: 6, velX: 1, velY: 0 },
        { posX: 8, posY: 6, velX: 0, velY: -1 },
        { posX: 0, posY: 6, velX: -1, velY: 1 },
        { posX: 0, posY: 2, velX: 0, velY: -1 },
        { posX: 4, posY: 2, velX: 2, velY: 0 },
        { posX: 8, posY: 4, velX: 1, velY: 2 },
        { posX: 7, posY: 7, velX: 2, velY: 1 },
        { posX: 4, posY: 1, velX: 2, velY: -2 },
        { posX: 0, posY: 3, velX: -1, velY: -1 },
        { posX: 8, posY: 0, velX: 1, velY: 0 },
        { posX: 0, posY: 0, velX: 2, velY: 0 },
        { posX: 8, posY: 3, velX: 1, velY: -2 },
        { posX: 8, posY: 7, velX: -2, velY: 0 },
        { posX: 3, posY: 3, velX: 2, velY: -1 } ]

      var expextedDisplayString =
            '\n' + '\n' +
            '  #...#..###  \n' +
            '  #...#...#.  \n' +
            '  #...#...#.  \n' +
            '  #####...#.  \n' +
            '  #...#...#.  \n' +
            '  #...#...#.  \n' +
            '  #...#...#.  \n' +
            '  #...#..###  \n' + '\n'

      var displayString = dayTen.renderDisplay(positionVelocityObjectArray)

      assert.deepStrictEqual(displayString, expextedDisplayString)
    })
  })
  // describe('dayTen.initializeCanvas - given an array of position/velocity records and the width/height of the canvas ', function () {
  //   it('should return an object with data required to set up the html Canvas', function () {
  //     var positionVelocityArray = [
  //       'position=< 9,  1> velocity=< 0,  2>',
  //       'position=< 7,  0> velocity=<-1,  0>',
  //       'position=< 3, -2> velocity=<-1,  1>',
  //       'position=< 6, 10> velocity=<-2, -1>',
  //       'position=< 2, -4> velocity=< 2,  2>',
  //       'position=<-6, 10> velocity=< 2, -2>',
  //       'position=< 1,  8> velocity=< 1, -1>',
  //       'position=< 1,  7> velocity=< 1,  0>',
  //       'position=<-3, 11> velocity=< 1, -2>',
  //       'position=< 7,  6> velocity=<-1, -1>',
  //       'position=<-2,  3> velocity=< 1,  0>',
  //       'position=<-4,  3> velocity=< 2,  0>',
  //       'position=<10, -3> velocity=<-1,  1>',
  //       'position=< 5, 11> velocity=< 1, -2>',
  //       'position=< 4,  7> velocity=< 0, -1>',
  //       'position=< 8, -2> velocity=< 0,  1>',
  //       'position=<15,  0> velocity=<-2,  0>',
  //       'position=< 1,  6> velocity=< 1,  0>',
  //       'position=< 8,  9> velocity=< 0, -1>',
  //       'position=< 3,  3> velocity=<-1,  1>',
  //       'position=< 0,  5> velocity=< 0, -1>',
  //       'position=<-2,  2> velocity=< 2,  0>',
  //       'position=< 5, -2> velocity=< 1,  2>',
  //       'position=< 1,  4> velocity=< 2,  1>',
  //       'position=<-2,  7> velocity=< 2, -2>',
  //       'position=< 3,  6> velocity=<-1, -1>',
  //       'position=< 5,  0> velocity=< 1,  0>',
  //       'position=<-6,  0> velocity=< 2,  0>',
  //       'position=< 5,  9> velocity=< 1, -2>',
  //       'position=<14,  7> velocity=<-2,  0>',
  //       'position=<-3,  6> velocity=< 2, -1>'
  //     ]

  //     var expextedObject = {
  //       minX: 0,
  //       maxX: 0,
  //       minY: 0,
  //       maxY: 0,
  //       startX: 0,
  //       endX: 0,
  //       startY: 0,
  //       endY: 0,
  //       offsetX: 0,
  //       offsetY: 0,
  //       positionVelocityObjectArray: [
  //         { posX: 9, posY: 7, velX: 0, velY: 2 },
  //         { posX: 4, posY: 0, velX: -1, velY: 0 },
  //         { posX: 0, posY: 1, velX: -1, velY: 1 },
  //         { posX: 0, posY: 7, velX: -2, velY: -1 },
  //         { posX: 8, posY: 2, velX: 2, velY: 2 },
  //         { posX: 0, posY: 4, velX: 2, velY: -2 },
  //         { posX: 4, posY: 5, velX: 1, velY: -1 },
  //         { posX: 4, posY: 7, velX: 1, velY: 0 },
  //         { posX: 0, posY: 5, velX: 1, velY: -2 },
  //         { posX: 4, posY: 3, velX: -1, velY: -1 },
  //         { posX: 1, posY: 3, velX: 1, velY: 0 },
  //         { posX: 2, posY: 3, velX: 2, velY: 0 },
  //         { posX: 7, posY: 0, velX: -1, velY: 1 },
  //         { posX: 8, posY: 5, velX: 1, velY: -2 },
  //         { posX: 4, posY: 4, velX: 0, velY: -1 },
  //         { posX: 8, posY: 1, velX: 0, velY: 1 },
  //         { posX: 9, posY: 0, velX: -2, velY: 0 },
  //         { posX: 4, posY: 6, velX: 1, velY: 0 },
  //         { posX: 8, posY: 6, velX: 0, velY: -1 },
  //         { posX: 0, posY: 6, velX: -1, velY: 1 },
  //         { posX: 0, posY: 2, velX: 0, velY: -1 },
  //         { posX: 4, posY: 2, velX: 2, velY: 0 },
  //         { posX: 8, posY: 4, velX: 1, velY: 2 },
  //         { posX: 7, posY: 7, velX: 2, velY: 1 },
  //         { posX: 4, posY: 1, velX: 2, velY: -2 },
  //         { posX: 0, posY: 3, velX: -1, velY: -1 },
  //         { posX: 8, posY: 0, velX: 1, velY: 0 },
  //         { posX: 0, posY: 0, velX: 2, velY: 0 },
  //         { posX: 8, posY: 3, velX: 1, velY: -2 },
  //         { posX: 8, posY: 7, velX: -2, velY: 0 },
  //         { posX: 3, posY: 3, velX: 2, velY: -1 } ]
  //     }
  //     var dataObject = dayTen.initializeCanvas(positionVelocityObjectArray)

  //     assert.deepStrictEqual(dataObject, expextedObject)
  //   })
  // })
})
