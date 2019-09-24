var assert = require('assert');
var dayEleven = require("../lib/dayEleven.js");

describe('dayEleven', function () {

    describe('dayEleven.getCellPower - given a grid serial number and the cell coordinates  ', function () {
        it('should return the power for one cell', function () {
            var gridSerialNumber = 8;
            var xCoord = 3;
            var yCoord = 5;
            var cellPower = dayEleven.getCellPower(gridSerialNumber, xCoord, yCoord);
            var expectedPower = 4;
            assert.equal(cellPower, expectedPower);

        });
    });

    describe('dayEleven.populatePowerGrid - given a grid serial number and dimensions  ', function () {
        it('should return a grid with the power filled in for each cell', function () {
            var gridSerialNumber = 8;
            var xDimension = 10;
            var yDimension = 10;
            var powerGrid = dayEleven.populatePowerGrid(gridSerialNumber, xDimension, yDimension);
            var expectedPowerGrid = [
                [ -3, -3, -3, -2, -2, -2, -1, -1, 0, 0 ],
                [ -2, -2, -1, 0, 0, 1, 2, 2, 3, 4 ],
                [ -1, 0, 1, 2, 2, 3, -5, -4, -3, -2 ],
                [ 0, 1, 2, 3, -5, -4, -3, -1, 0, 2 ],
                [ 1, 3, 4, -5, -3, -1, 0, 2, 4, -4 ],
                [ 3, 4, -4, -3, -1, 1, 3, -5, -2, 0 ],
                [ 4, -4, -3, -1, 1, 4, -4, -1, 1, 4 ],
                [ -5, -3, -1, 1, 4, -4, -1, 2, -5, -2 ],
                [ -4, -2, 1, 3, -4, -1, 2, -5, -1, 2 ],
                [ -3, 0, 2, -5, -2, 1, -5, -2, 2, -4 ]
        ];
            assert.deepEqual(powerGrid, expectedPowerGrid);

        });
    });
    describe('dayEleven.sumPowerSquare - given a grid of cell powers and xand y coordinates and the side of the square', function () {
        it('should return a sum of the power for the square grid starting with the coordinates', function () {
            var powerGrid = [
                [ -3, -3, -3, -2, -2, -2, -1, -1, 0, 0 ],
                [ -2, -2, -1, 0, 0, 1, 2, 2, 3, 4 ],
                [ -1, 0, 1, 2, 2, 3, -5, -4, -3, -2 ],
                [ 0, 1, 2, 3, -5, -4, -3, -1, 0, 2 ],
                [ 1, 3, 4, -5, -3, -1, 0, 2, 4, -4 ],
                [ 3, 4, -4, -3, -1, 1, 3, -5, -2, 0 ],
                [ 4, -4, -3, -1, 1, 4, -4, -1, 1, 4 ],
                [ -5, -3, -1, 1, 4, -4, -1, 2, -5, -2 ],
                [ -4, -2, 1, 3, -4, -1, 2, -5, -1, 2 ],
                [ -3, 0, 2, -5, -2, 1, -5, -2, 2, -4 ]
        ];
            var xCoord = 0;
            var yCoord = 0;
            var expectedSum = -14;
            var squareSize = 3;
            var powerSum = dayEleven.sumPowerSquare(powerGrid, xCoord, yCoord, squareSize);
 
            assert.equal(powerSum, expectedSum);

        });
    });

    describe('dayEleven.findHighestPower - given a serial number, grid dimensions and square size ', function () {
        it('should return the coordinates of the square with the highest power', function () {
            var gridSerialNumber = 8;
            var xDimension = 10;
            var yDimension = 10;
            var squareSize = 3;
            var powerIdentity = dayEleven.findHighestPower(gridSerialNumber, xDimension, yDimension, squareSize);
            var expectedIdentity =  {
                highX: 1,
                highY: 4,
                highestPower: 14,
                squareSize: 3
            };
            
            assert.deepEqual(powerIdentity, expectedIdentity);

        });
    });

    describe('dayEleven.findHighestPowerForAnySquareSize - given a serial number, grid dimensions and square size ', function () {
        it('should return the coordinates of the square with the highest power', function () {
            var gridSerialNumber = 8;
            var xDimension = 10;
            var yDimension = 10;
            var powerIdentity = dayEleven.findHighestPowerForAnySquareSize(gridSerialNumber, xDimension, yDimension);
            var expectedIdentity =  {
                highX: 1,
                highY: 4,
                highestPower: 14,
                squareSize: 3
            };
            
            assert.deepEqual(powerIdentity, expectedIdentity);

        });
    });
});