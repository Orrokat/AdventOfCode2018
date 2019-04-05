
// requirements from Advent of Code 2018 Day 10
//Each fuel cell has a coordinate ranging from 1 to 300 in both the X (horizontal) and Y (vertical) direction.
// Find the fuel cell's rack ID, which is its X coordinate plus 10.
// Begin with a power level of the rack ID times the Y coordinate.
// Increase the power level by the value of the grid serial number (your puzzle input).
// Set the power level to itself multiplied by the rack ID.
// Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
// Subtract 5 from the power level.

function getCellPower(gridSerialNumber, xCoord, yCoord){

    var rackID = xCoord + 10;
    var powerLevel = rackID * yCoord;
    powerLevel += gridSerialNumber;
    powerLevel = powerLevel * rackID;
    var intString = powerLevel.toString(10);
    var hundredsPlace = parseInt(intString.length < 3 ? 0:intString[intString.length - 3]);
    var cellPower =  hundredsPlace - 5;
    return cellPower;
};

function populatePowerGrid(gridSerialNumber, xDimension, yDimension){

    var powerGrid = [];
    for(var y = 0; y < yDimension; y++){
        powerGrid.push([]);
        for(var x = 0; x < xDimension; x++){
            powerGrid[y].push(getCellPower(gridSerialNumber, x + 1, y + 1)) //the grid is one relative
        }
    }
    return powerGrid;

};

function sumPowerSquare(powerGrid, xCoord, yCoord, squareSize){
    var powerSum = 0;

    for(var i = yCoord; i < yCoord + squareSize; i++){
        for(var j = xCoord; j < xCoord + squareSize; j++){
            powerSum += powerGrid[i][j];
        };
    };
    return powerSum;
};

function findHighestPower(gridSerialNumber, xDimension, yDimension, squareSize){
    var powerGrid = populatePowerGrid(gridSerialNumber, xDimension, yDimension);
    var highestPower = sumPowerSquare(powerGrid, 0, 0, squareSize);
    var highY = 1;
    var highX = 1;

    for(var y = 0; y < yDimension - (squareSize - 1); y++){  // 3x3 grid should not go beyond the end of the powerGrid
        for(var x = 0; x < xDimension - (squareSize - 1); x++){

            var powerSum = sumPowerSquare(powerGrid, x, y, squareSize);
            if(powerSum > highestPower){
                highestPower = powerSum;
                highY = y + 1;
                highX = x + 1;
            }
        }
    }
    var highestPowerIdentity = {
        highX: highX,
        highY: highY,
        highestPower: highestPower,
        squareSize: squareSize
    }
    
    return highestPowerIdentity;
};

function findHighestPowerForAnySquareSize(gridSerialNumber, xDimension, yDimension){
    var highestPowerIdentity = {
        highX: 0,
        highY: 0,
        highestPower: 0,
        squareSize: 0   
    }

    for(var size = 3; size < xDimension; size++){
        var powerIdentity = findHighestPower(gridSerialNumber, xDimension, yDimension, size);
        if(powerIdentity.highestPower > highestPowerIdentity.highestPower){
            highestPowerIdentity = powerIdentity;
        }
    }
    console.log(highestPowerIdentity);
    return highestPowerIdentity;
}



exports.getCellPower = getCellPower;
exports.populatePowerGrid = populatePowerGrid;
exports.sumPowerSquare = sumPowerSquare;
exports.findHighestPower = findHighestPower;
exports.findHighestPowerForAnySquareSize = findHighestPowerForAnySquareSize;

