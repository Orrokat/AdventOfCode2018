var assert = require('assert');
var dayNine = require("../lib/dayNine.js");

describe('dayNine', function () {

    describe('dayNine.marbleGame - given a number of elf players and the highest number marble  ', function () {
        it('should return the highest score', function () {
            var numElves = 9;
            var highestMarble = 25;
            highestScore = dayNine.marbleGame(numElves, highestMarble);

            var expectedhighestScore = 32;
            assert.equal(highestScore, expectedhighestScore);

        });
    });

    describe('dayNine.marbleGame - given a number of elf players and the highest number marble  ', function () {
        it('should return the highest score', function () {
            var numElves = 10;
            var highestMarble = 1618;
            highestScore = dayNine.marbleGame(numElves, highestMarble);

            var expectedhighestScore = 8317;
            assert.equal(highestScore, expectedhighestScore);

        });
    });

    describe('dayNine.marbleGame - given a number of elf players and the highest number marble  ', function () {
        it('should return the highest score', function () {
            var numElves = 13;
            var highestMarble = 7999;
            highestScore = dayNine.marbleGame(numElves, highestMarble);

            var expectedhighestScore = 146373;
            assert.equal(highestScore, expectedhighestScore);

        });
    });

    describe('dayNine.marbleGame - given a number of elf players and the highest number marble  ', function () {
        it('should return the highest score', function () {
            var numElves = 17;
            var highestMarble = 1104;
            highestScore = dayNine.marbleGame(numElves, highestMarble);

            var expectedhighestScore = 2764;
            assert.equal(highestScore, expectedhighestScore);

        });
    });

    describe('dayNine.marbleGame - given a number of elf players and the highest number marble  ', function () {
        it('should return the highest score', function () {
            var numElves = 21;
            var highestMarble = 6111;
            highestScore = dayNine.marbleGame(numElves, highestMarble);

            var expectedhighestScore = 54718;
            assert.equal(highestScore, expectedhighestScore);

        });
    });

    describe('dayNine.marbleGame - given a number of elf players and the highest number marble  ', function () {
        it('should return the highest score', function () {
            var numElves = 30;
            var highestMarble = 5807;
            highestScore = dayNine.marbleGame(numElves, highestMarble);

            var expectedhighestScore = 37305;
            assert.equal(highestScore, expectedhighestScore);

        });
    });

    describe('dayNine.marbleGame - given a number of elf players and the highest number marble  ', function () {
        it('should return the highest score', function () {
            var numElves = 30;
            var highestMarble = 5807;
            highestScore = dayNine.marbleGame(numElves, highestMarble);

            var expectedhighestScore = 37305;
            assert.equal(highestScore, expectedhighestScore);

        });
    });
});