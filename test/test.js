var assert = require('assert');
var dayOne = require("../lib/dayOne.js");
var dayTwo = require("../lib/dayTwo.js");

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
describe('dayTwo', function () {

    describe('given an empty array returns -1', function () {
        it('it should return -1 if there are no entries in the array', function () {
            var boxID = [];
            var expectedCounts = -1;
            var letterCounts = dayTwo.countLetters(boxID);

            assert.equal(letterCounts, expectedCounts);
        });
    });

    describe('given one array of six characters return an array with the number of occurences of each character ', function () {
        it('it should return an array of 6 ones if all the characters are unique', function () {
            var boxID = ["a", "b", "c", "d", "e", "f"];
            var expectedCounts = [1, 1, 1, 1, 1, 1];
            var letterCounts = dayTwo.countLetters(boxID);

            assert.deepEqual(letterCounts, expectedCounts);
        });
    });  
    
    describe('given one array of six characters return an array with the number of occurences of each character ', function () {
        it('it should return an array with one count of 2 for the array a, b, c, a, d, e', function () {
            var boxID = ["a", "b", "c", "a", "d", "e"];
            var expectedCounts = [2, 1, 1, 1, 1];
            var letterCounts = dayTwo.countLetters(boxID);

            assert.deepEqual(letterCounts, expectedCounts);
        });
    });  

    describe('given one array of six characters return an array with the number of occurences of each character ', function () {
        it('it should return an array with one count of 3 for the array a, b, c, c, c, d', function () {
            var boxID = ["a", "b", "c", "c", "c", "d"];
            var expectedCounts = [1, 1, 3, 1];
            var letterCounts = dayTwo.countLetters(boxID);

            assert.deepEqual(letterCounts, expectedCounts);
        });
    });

    describe('given one array of six characters return an array with the number of occurences of each character ', function () {
        it('it should return an array with one count of 2 and one of 3 for the array b, a, b, a, b, c', function () {
            var boxID = ["b", "a", "b", "a", "b", "c"];
            var expectedCounts = [3, 2, 1];
            var letterCounts = dayTwo.countLetters(boxID);

            assert.deepEqual(letterCounts, expectedCounts);
        });
    });

    describe('given one string of six characters return an array with the number of occurences of each character ', function () {
        it('it should return an array with one count of 2 and one of 3 for the array b, a, b, a, b, c', function () {
            var boxID = "bababc";
            var expectedCounts = [3, 2, 1];
            var letterCounts = dayTwo.countLetters(boxID);

            assert.deepEqual(letterCounts, expectedCounts);
        });
    });

    describe('given multiple strings of characters return a count of strings that have at least one letter that appears twice', function () {
        it('it should return a count of 9', function () {
            var boxID = [
               "xrecqmdonskvzupalfkwhjctdb",
               "xrlgqmavnskvzupalfiwhjctdb",
               "xregqmyonskvzupalfiwhjpmdj",
               "areyqmyonskvzupalfiwhjcidb",
               "xregqpyonskvzuaalfiwhjctdy",
               "xwegumyonskvzuphlfiwhjctdb",
               "xregumymnskvzupalfiwhjctib",
               "xregqmyonjkvzupalfvwijctdb",
               "xrmgqmyonsdvzupalfiwhjcthb"
            ];
            
            var expectedCount = 9;
            var linesWithTwo = dayTwo.countLines(boxID, 2);
            assert.deepEqual(linesWithTwo, expectedCount);
        });
    }); 

    describe('given multiple strings of characters return a count of strings that have at least one letter that appears three times', function () {
        it('it should return a count of 2', function () {
            var boxID = [
                "xrecqmdonskdzupalfkwhjctdb",
                "xrlgqmavnskvzupalfiwhjctdb",
                "xregqmyonskvzupalfiwhjpmdj",
                "areyqmyonskvzuyalfiwhjcidb",
                "xregqpyonskvzuaalfiwhjctdy",
                "xwegumyonskvzuphlfiwhjctdb",
                "xregumymnskvzupalfiwhjctib",
                "xregqmyonjkvzupalfvwijctdb",
                "xrmgqmyonsdvzupalfiwhjcthb"
            ];
            
            var expectedCount = 2;
            var linesWithThree = dayTwo.countLines(boxID, 3);
            assert.deepEqual(linesWithThree, expectedCount);
        });
    });
    describe('given multiple strings of characters return checksum of number of lines with 2 times number of lines with 3', function () {
        it('it should return a count of 18', function () {
            var boxIDs = [
                "xrecqmdonskdzupalfkwhjctdb",
                "xrlgqmavnskvzupalfiwhjctdb",
                "xregqmyonskvzupalfiwhjpmdj",
                "areyqmyonskvzuyalfiwhjcidb",
                "xregqpyonskvzuaalfiwhjctdy",
                "xwegumyonskvzuphlfiwhjctdb",
                "xregumymnskvzupalfiwhjctib",
                "xregqmyonjkvzupalfvwijctdb",
                "xrmgqmyonsdvzupalfiwhjcthb"
            ];
            
            var expectedCheckSum = 18;
            var checksum = dayTwo.getCheckSum(boxIDs);
            assert.equal(checksum, expectedCheckSum);
        });
    });
 });
