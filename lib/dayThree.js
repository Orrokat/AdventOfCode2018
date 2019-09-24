function fillGrid (rows, columns) {
  var grid = []
  for (var row = 0; row < rows; row++) {
    grid.push([])
    for (var column = 0; column < columns; column++) {
      grid[row].push(0)
    }
  }

  return grid
}

function parseClaim (claimData) {
  var claimDataArray = claimData.split(/#|@|:|,|x/g)
  // String.split returns '' at index 0 in this scenario so we start picking up the data at index 1
  return {
    claimNumber: parseInt(claimDataArray[1]),
    column: parseInt(claimDataArray[2]),
    row: parseInt(claimDataArray[3]),
    width: parseInt(claimDataArray[4]),
    height: parseInt(claimDataArray[5])
  }
}

function mapClaims (claimsData, claimsMap) {
  for (var dataIndex = 0; dataIndex < claimsData.length; dataIndex++) {
    claimsMap = mapOneClaim(claimsData[dataIndex], claimsMap)
  }

  return claimsMap
}
function mapOneClaim (claimData, claimsMap) {
  var thisClaim = parseClaim(claimData)
  var column = thisClaim.column
  var row = thisClaim.row
  var width = thisClaim.width
  var height = thisClaim.height
  for (var claimRow = row; claimRow < row + height; claimRow++) {
    for (var claimColumn = column; claimColumn < column + width; claimColumn++) {
      claimsMap[claimRow][claimColumn]++
    }
  }
  return claimsMap
}

function findContestedInches (claimsData, rows, columns) {
  var contestedInches = 0
  var claimsMap = fillGrid(rows, columns)
  var squareInchMap = mapClaims(claimsData, claimsMap)
  for (var squareInchRows = 0; squareInchRows < claimsMap.length; squareInchRows++) {
    for (var squareInchColumns = 0; squareInchColumns < claimsMap[0].length; squareInchColumns++) {
      if (squareInchMap[squareInchRows][squareInchColumns] > 1) {
        contestedInches++
      }
    }
  }
  return contestedInches
}

function findUncontestedClaim (claimsData, rows, columns) {
  var claimsMap = fillGrid(rows, columns)
  var squareInchMap = mapClaims(claimsData, claimsMap)

  for (var claimsIndex = 0; claimsIndex < claimsData.length; claimsIndex++) {
    var thisClaim = parseClaim(claimsData[claimsIndex])
    var claimNumber = thisClaim.claimNumber
    var column = thisClaim.column
    var row = thisClaim.row
    var width = thisClaim.width
    var height = thisClaim.height
    var goodClaim = true
    for (var gridRow = row; gridRow < row + height; gridRow++) {
      for (var gridColumn = column; gridColumn < column + width; gridColumn++) {
        if (squareInchMap[gridRow][gridColumn] > 1) {
          goodClaim = false
        }
      }
    }
    if (goodClaim) {
      return claimNumber
    }
  }
  return null
}

exports.fillGrid = fillGrid
exports.parseClaim = parseClaim
exports.mapClaims = mapClaims
exports.mapOneClaim = mapOneClaim
exports.findContestedInches = findContestedInches
exports.findUncontestedClaim = findUncontestedClaim
