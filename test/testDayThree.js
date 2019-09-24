var assert = require('assert');
var dayThree = require("../lib/dayThree.js");


describe('dayThree', function () {

    describe('given number of rows and columns, create a two level array and initialize all values to 0', function () {
        it('it should return a two level array with all values set to 0', function () {
            var squareInchArray = [];
            var rows = 8;
            var columns = 8;
            var squareInchArray = dayThree.fillGrid(rows, columns);
            var expectedArray = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]

            assert.deepEqual(squareInchArray, expectedArray);
        });
    });

    describe('given data string in (#claim number @ row, column: widthxheight) format, extract relevant data', function () {
        it('it should return an object with claim number, row, column, width, height', function () {
            var claimData = "#1 @ 1,3: 4x4";
            var squareInchObject = dayThree.parseClaim(claimData);
            var expectedObject = {
                claimNumber: 1,
                column: 1,
                row: 3,
                width: 4,
                height: 4
            };

            assert.deepEqual(squareInchObject, expectedObject);
        });
    });

    describe('given claims data string, map the claim on the claim map grid by adding 1 to the number in the cell', function () {
        it('it should return an array with the claim mapped', function () {
            var claimsData = "#1 @ 1,3: 4x4";
            var rows = 8;
            var columns = 8;
            var claimsMap = dayThree.fillGrid(rows, columns);
            var claimsMap = dayThree.mapOneClaim(claimsData, claimsMap);
            var expectedArray = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 0, 0, 0],
                [0, 1, 1, 1, 1, 0, 0, 0],
                [0, 1, 1, 1, 1, 0, 0, 0],
                [0, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]

            assert.deepEqual(claimsMap, expectedArray);
        });
    });

    describe('given an array of claim data strings, return an array showing number of times each square inch is claimed', function () {
        it('it should return a 2 level array representing how many times each square inch is claimed', function () {
            var claimsData = [
                "#1 @ 1,3: 4x4",
                "#2 @ 3,1: 4x4",
                "#3 @ 5,5: 2x2"
            ];
            var rows = 8;
            var columns = 8;
            var claimsMap =  dayThree.fillGrid(rows, columns);
            var squareInchArray = dayThree.mapClaims(claimsData, claimsMap);
            var expectedArray = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 0],
                [0, 0, 0, 1, 1, 1, 1, 0],
                [0, 1, 1, 2, 2, 1, 1, 0],
                [0, 1, 1, 2, 2, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]

            assert.deepEqual(squareInchArray, expectedArray);
        });
    });

    describe('given an array of claim data strings, return an array showing number of times each square inch is claimed', function () {
        it('it should return a 2 level array representing how many times each square inch is claimed', function () {
            var claimsData = [
                "#1 @ 2,3: 4x4",
                "#2 @ 3,1: 4x4",
                "#3 @ 5,5: 2x2"
            ];
            var rows = 8;
            var columns = 8;
            var claimsMap =  dayThree.fillGrid(rows, columns);
            var squareInchArray = dayThree.mapClaims(claimsData, claimsMap);
            var expectedArray = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 0],
                [0, 0, 0, 1, 1, 1, 1, 0],
                [0, 0, 1, 2, 2, 2, 1, 0],
                [0, 0, 1, 2, 2, 2, 1, 0],
                [0, 0, 1, 1, 1, 2, 1, 0],
                [0, 0, 1, 1, 1, 2, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]

            assert.deepEqual(squareInchArray, expectedArray);
        });
    });

    describe('given an array of claim data strings, the number of square inches claimed more than once', function () {
        it('it should return a 4', function () {
            var claimsData = [
                "#1 @ 1,3: 4x4",
                "#2 @ 3,1: 4x4",
                "#3 @ 5,5: 2x2"
            ];
            rows = 8;
            columns = 8;
            var expectedInches = 4;
            var contestedInches = dayThree.findContestedInches(claimsData, rows, columns);
            assert.equal(contestedInches, expectedInches);
        });
    });

    describe('given an array of claim data strings, return the claim number for the claim with no contention', function () {
        it('it should return a 3', function () {
            var claimsData = [
                "#1 @ 1,3: 4x4",
                "#2 @ 3,1: 4x4",
                "#3 @ 5,5: 2x2"
            ];
            rows = 8;
            columns = 8;
            var expectedClaimID = 3;
            var claimID = dayThree.findUncontestedClaim(claimsData, rows, columns);
            assert.equal(claimID, expectedClaimID);
        });
    });

    describe('given an array of claim data strings, return the claim number for the claim with no contention', function () {
        it('it should return a 4', function () {
            var claimsData = [
                "#1 @ 2,3: 4x4",
                "#2 @ 3,1: 4x4",
                "#3 @ 5,5: 2x2",
                "#4 @ 1,1: 2x2"
            ];
            rows = 8;
            columns = 8;
            var expectedClaimID = 4;
            var claimID = dayThree.findUncontestedClaim(claimsData, rows, columns);
            assert.equal(claimID, expectedClaimID);
        });

    });
});