var assert = require('assert');
var dayEight = require("../lib/dayEight.js");

describe('dayEight', function () {

    describe('dayEight.sumMetaData - given an array of numbers  ', function () {
        it('should return a sum of the metadata', function () {
            var licenseNodeDataArray = [0, 3, 10, 11, 12];
            var nodeIndex = 0;
            var runningSum = 0;
            var arrayIndex = 0;
            var metaDataSum = dayEight.sumMetaData(licenseNodeDataArray);

            var expectedSum = 33;
            assert.equal(metaDataSum, expectedSum);

        });
    });

    describe('dayEight.sumMetaData - given an array of numbers  ', function () {
        it('should return a sum of the metadata', function () {
            var licenseNodeDataArray = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];
            var nodeIndex = 0;
            var runningSum = 0;
            var arrayIndex = 0;
            var metaDataSum = dayEight.sumMetaData(licenseNodeDataArray);

            var expectedSum = 138;
            assert.equal(metaDataSum, expectedSum);

        });
    });
});