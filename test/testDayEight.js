var assert = require('assert')
var dayEight = require('../lib/dayEight.js')

describe('dayEight', function () {
  describe('dayEight.sumMetaData - given an array of numbers  ', function () {
    it('should return a sum of the metadata', function () {
      var licenseNodeDataArray = [0, 3, 10, 11, 12]
      var metaDataSum = dayEight.sumMetaData(licenseNodeDataArray)

      var expectedSum = 33
      assert.strictEqual(metaDataSum, expectedSum)
    })
  })

  describe('dayEight.sumMetaData - given an array of numbers  ', function () {
    it('should return a sum of the metadata', function () {
      var licenseNodeDataArray = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]
      var metaDataSum = dayEight.sumMetaData(licenseNodeDataArray)

      var expectedSum = 138
      assert.strictEqual(metaDataSum, expectedSum)
    })
  })

  describe('dayEight.sumTree - given an array of numbers  ', function () {
    it('should return a sum of the primary node', function () {
      var licenseNodeDataArray = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]
      var metaDataSum = dayEight.sumTree(licenseNodeDataArray)

      var expectedSum = 66
      assert.strictEqual(metaDataSum, expectedSum)
    })
  })
})
