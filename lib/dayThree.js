function fillGrid(rows, columns) {
    var grid = [];
    for(row = 0; row < rows; row++){
        grid.push([]);
        for(column = 0; column < columns; column++){
            grid[row].push(0);
        }   
     }
    
    return grid;
}

function parseClaim(claimData) {
    var claimDataArray = claimData.split(/#|@|:|,|x/g);
    //String.split returns '' at index 0 in this scenario so we start picking up the data at index 1
    return {
        claimNumber: parseInt(claimDataArray[1]),
        column: parseInt(claimDataArray[2]),
        row: parseInt(claimDataArray[3]),
        width: parseInt(claimDataArray[4]),
        height: parseInt(claimDataArray[5])
    }
}

function mapClaims(claimsData, claimsMap){

    for(dataIndex = 0; dataIndex < claimsData.length; dataIndex++){
        claimsMap = mapOneClaim(claimsData[dataIndex], claimsMap)
    }
   
    return claimsMap;

}
function mapOneClaim(claimData, claimsMap){
 
    thisClaim = parseClaim(claimData);
    var claimNumber = thisClaim.claimNumber;
    var column = thisClaim.column;
    var row = thisClaim.row;
    var width = thisClaim.width;
    var height = thisClaim.height;
    for(claimRow = row; claimRow < row + height; claimRow++){
        for(claimColumn = column; claimColumn < column + width; claimColumn++){
                claimsMap[claimRow][claimColumn]++;
        }
    }
    return claimsMap;
}

function findContestedInches(claimsData, rows, columns){

    var contestedInches = 0;
    var claimsMap = fillGrid(rows, columns);
    var squareInchMap = mapClaims(claimsData, claimsMap);
    for(squareInchRows = 0; squareInchRows < claimsMap.length; squareInchRows++){
        for(squareInchColumns = 0; squareInchColumns < claimsMap[0].length; squareInchColumns++){
            if(squareInchMap[squareInchRows][squareInchColumns] > 1) {
                contestedInches++;
            }
        }
    }
    return contestedInches;
}

function findUncontestedClaim(claimsData, rows, columns){

    var claimsMap = fillGrid(rows, columns);
    var squareInchMap = mapClaims(claimsData, claimsMap);

    for(claimsIndex = 0; claimsIndex < claimsData.length; claimsIndex++){
        thisClaim = parseClaim(claimsData[claimsIndex]);
        claimNumber = thisClaim.claimNumber;
        column = thisClaim.column;
        row = thisClaim.row;
        width = thisClaim.width;
        height = thisClaim.height;
        var goodClaim = true;
        for(gridRow = row; gridRow < row + height; gridRow++){
            for(gridColumn = column; gridColumn < column + width; gridColumn++){
                if(squareInchMap[gridRow][gridColumn] > 1){
                     goodClaim = false;   
                }
            }
        }
        if(goodClaim){
            return claimNumber;
        }
    }
    return null;
}

exports.fillGrid = fillGrid; 
exports.parseClaim = parseClaim; 
exports.mapClaims = mapClaims;
exports.mapOneClaim = mapOneClaim; 
exports.findContestedInches = findContestedInches; 
exports.findUncontestedClaim = findUncontestedClaim; 




