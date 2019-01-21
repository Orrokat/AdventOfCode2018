var assert = require('assert');
var dayOne = require("../lib/dayOne.js");

describe('dayOne', function () {

    describe('frequency starts at zero', function () {
        it('it should be zero if no frequency changes are made', function () {
            var frequencyChanges = [];
            var expectedFrequency = 0;
            var frequency = dayOne.adjust(frequencyChanges);

            assert.equal(frequency, expectedFrequency);
        });
    });    

    describe('frequency should add a positive number', function () {
        it('it should add the value in frequencyChanges', function () {
            var frequencyChanges = [2];
            var expectedFrequency = 2;
            var frequency = dayOne.adjust(frequencyChanges);

            assert.equal(frequency, expectedFrequency);
        });
    }); 
    
    describe('frequency should add a negative number', function () {
        it('it should add the value in frequencyChanges', function () {
            var frequencyChanges = [-2];
            var expectedFrequency = -2;
            var frequency = dayOne.adjust(frequencyChanges);

            assert.equal(frequency, expectedFrequency);
        });
    });

    describe('frequency should add a series of numbers', function () {
        it('it should add the value in frequencyChanges', function () {
            var frequencyChanges = [-2, 2, 4, 1];
            var expectedFrequency = 5;
            var frequency = dayOne.adjust(frequencyChanges);

            assert.equal(frequency, expectedFrequency);
        });
    });
});