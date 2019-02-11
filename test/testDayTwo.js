var assert = require('assert');
var dayTwo = require("../lib/dayTwo.js");

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

    describe('given two strings of characters that are only different by one character return a string of just those characters that match', function () {
        it('it should return the string xrecqmdonskdzupalfkwhjcdb', function () {
 
            var boxID1 = "xrecqmdonskdzupalfkwhjctdb";
            var boxID2 = "xrecqmdonskdzupalfkwhjcpdb";
            
            var expectedIDString = "xrecqmdonskdzupalfkwhjcdb";
            var idString = dayTwo.getStringOfMatchingChars(boxID1, boxID2);
            assert.deepEqual(idString, expectedIDString);
        });
    });

    describe('given multiple strings of characters return the matching characters for the strings that are only different by one character', function () {
        it('it should return the string xrecqmdonskdzupalfkwhjcdb', function () {
            var boxIDs = [
                "xrecqmdonskdzupalfkwhjctdb",
                "xrecqxdonskdzupalfkwhjcxdb",
                "xrxcqmdxnskdzupalfkwhxctdb",
                "xrecqmdxnsxdzupalfkwhjctdb",
                "xrecqxdonskdxupalfkwhjcxdb",
                "xrecqmdonskdzupalfkwhxctdb",
                "xrecqxdonskdzuxalfkwhjcxdb"
             ];
            
            var expectedIDString = "xrecqmdonskdzupalfkwhctdb";
            var idString = dayTwo.getCloseMatchIDString(boxIDs);
            assert.equal(idString, expectedIDString);
        });
    });
});