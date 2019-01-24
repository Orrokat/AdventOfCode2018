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

    describe('given an array of frequency changes, return the first duplicate of the sums',
     function () {
        it('it should return the first frequency that is a duplicate', function () {
            var frequencyChanges = [-2, 2, 4, 1, 5, 50, -56, 1];
            var expectedFrequency = 4;
            var frequency = 0;
            var frequencyArray = [];
            var duplicateFrequency = dayOne.cycleFrequencyChanges(frequencyChanges, frequency, frequencyArray);

            assert.equal(duplicateFrequency, expectedFrequency);
        });
    });

    describe('given an array of frequency changes processed multiple times, return the first duplicate of the sums',
     function () {
        it('it should return null if no duplicate frequency is created', function () {
            var frequencyChanges = [-1, 5, -2, 3, 5, 8, 13, 21, -120, 1, 3, 4, 6];
            var expectedFrequency = null;
            var frequency = 0;
            var frequencyArray = [];
            var iterations = 0;            
            var duplicateFrequency = dayOne.cycleFrequencyChanges(frequencyChanges, frequency, frequencyArray, iterations);

            assert.equal(duplicateFrequency, expectedFrequency);
        });
    });

    describe('given an array of frequency changes processed multiple times, return the first duplicate of the sums',
    function () {
       it('it should return the first frequency that is a duplicate', function () {
           var frequencyChanges = [5, -20, 31, 5, 82, 13, 21, -119, 13, -30, 7, 6];
           var expectedFrequency = 103;
           var frequency = 0;
           var frequencyArray = [];
           var iterations = 0;
           var duplicateFrequency = dayOne.cycleFrequencyChanges(frequencyChanges, frequency, frequencyArray, iterations);

           assert.equal(duplicateFrequency, expectedFrequency);
       });
   });
});