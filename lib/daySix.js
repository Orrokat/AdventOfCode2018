function parseArray (coordArray) {
  var xyObjectArray = []
  for (var i = 0; i < coordArray.length; i++) {
    var coords = coordArray[i].split(',')
    xyObjectArray.push({ xCoord: parseInt(coords[0]), yCoord: parseInt(coords[1]) })
  }
  return xyObjectArray
}

function findMinMax (xyArray) {
  var minMaxObjject = { xMin: xyArray[0].xCoord,
    xMax: 0,
    yMin: xyArray[0].yCoord,
    yMax: 0 }

  for (var i = 0; i < xyArray.length; i++) {
    if (xyArray[i].xCoord < minMaxObjject.xMin) {
      minMaxObjject.xMin = xyArray[i].xCoord
    }
    if (xyArray[i].xCoord > minMaxObjject.xMax) {
      minMaxObjject.xMax = xyArray[i].xCoord
    }
    if (xyArray[i].yCoord < minMaxObjject.yMin) {
      minMaxObjject.yMin = xyArray[i].yCoord
    }
    if (xyArray[i].yCoord > minMaxObjject.yMax) {
      minMaxObjject.yMax = xyArray[i].yCoord
    }
  }
  return minMaxObjject
}
function createGrid (minMaxObject) {
  var defaultManhattenDistance = ((minMaxObject.xMax - minMaxObject.xMin) + (minMaxObject.yMax - minMaxObject.yMin)) * 2
  var yLength = minMaxObject.yMax + 2
  var xLength = minMaxObject.xMax + 2
  var targetCoordinateGrid = []
  for (var yIndex = 0; yIndex < yLength; yIndex++) {
    targetCoordinateGrid.push([])
    for (var xIndex = 0; xIndex < xLength; xIndex++) {
      targetCoordinateGrid[yIndex].push({ closestTargetX: -1, closestTargetY: -1, manhattenDistanceToClosest: defaultManhattenDistance })
    }
  }
  return targetCoordinateGrid
}
function calculateManhattenDistances (coordArray) {
  // find the Manhatten Distance from each cell in the grid to each of the target coordinates
  // label the cell with the target it is closest to
  // if the lowest distance is shared between more than one target, label with -1, -1
  var xyArray = parseArray(coordArray)
  var minMaxObject = findMinMax(xyArray)
  var targetGrid = createGrid(minMaxObject)

  for (var yIndex = minMaxObject.yMin - 1; yIndex < minMaxObject.yMax + 2; yIndex++) {
    for (var xIndex = minMaxObject.xMin - 1; xIndex < minMaxObject.xMax + 2; xIndex++) {
      if (targetGrid[yIndex][xIndex].manhattenDistanceToClosest === 0) {
        continue
      }
      var lowestDistance = targetGrid[yIndex][xIndex].manhattenDistanceToClosest
      var timesThisDistance = 0
      var closestX = targetGrid[yIndex][xIndex].closestTargetX
      var closestY = targetGrid[yIndex][xIndex].closestTargetY
      for (var targetIndex = 0; targetIndex < xyArray.length; targetIndex++) {
        if (yIndex === xyArray[targetIndex].yCoord && xIndex === xyArray[targetIndex].xCoord) {
          closestX = xIndex
          closestY = yIndex
          lowestDistance = 0
        } else {
          var manhattenDistance = Math.abs(xIndex - xyArray[targetIndex].xCoord) + Math.abs(yIndex - xyArray[targetIndex].yCoord)
          if (manhattenDistance < lowestDistance) {
            timesThisDistance = 1
            lowestDistance = manhattenDistance
            closestX = xyArray[targetIndex].xCoord
            closestY = xyArray[targetIndex].yCoord
          } else {
            if (manhattenDistance === lowestDistance) {
              timesThisDistance++
            }
          }
        }
      }
      if (timesThisDistance > 1) {
        closestX = -1
        closestY = -1
        lowestDistance = -1
      }
      targetGrid[yIndex][xIndex].closestTargetX = closestX
      targetGrid[yIndex][xIndex].closestTargetY = closestY
      targetGrid[yIndex][xIndex].manhattenDistanceToClosest = lowestDistance
    }
  }

  return targetGrid
}

function eliminateInfinites (coordinateGrid, xyArray) {
  // first row
  for (var xIndex = 0; xIndex < coordinateGrid[0].length; xIndex++) {
    if (coordinateGrid[0][xIndex].manhattenDistanceToClosest > 0) {
      for (var xyIndex = 0; xyIndex < xyArray.length; xyIndex++) {
        if (xyArray[xyIndex].xCoord === coordinateGrid[0][xIndex].closestTargetX &&
                    xyArray[xyIndex].yCoord === coordinateGrid[0][xIndex].closestTargetY) {
          xyArray.splice(xyIndex, 1)
        }
      }
    }
  };
  // last row
  for (xIndex = 0; xIndex < coordinateGrid[0].length; xIndex++) {
    if (coordinateGrid[coordinateGrid.length - 1][xIndex].manhattenDistanceToClosest > 0) {
      for (xyIndex = 0; xyIndex < xyArray.length; xyIndex++) {
        if (xyArray[xyIndex].xCoord === coordinateGrid[coordinateGrid.length - 1][xIndex].closestTargetX &&
                    xyArray[xyIndex].yCoord === coordinateGrid[coordinateGrid.length - 1][xIndex].closestTargetY) {
          xyArray.splice(xyIndex, 1)
        }
      }
    }
  };
  // first column
  for (var yIndex = 0; yIndex < coordinateGrid.length; yIndex++) {
    if (coordinateGrid[yIndex][0].manhattenDistanceToClosest > 0) {
      for (xyIndex = 0; xyIndex < xyArray.length; xyIndex++) {
        if (xyArray[xyIndex].xCoord === coordinateGrid[yIndex][0].closestTargetX &&
                    xyArray[xyIndex].yCoord === coordinateGrid[yIndex][0].closestTargetY) {
          xyArray.splice(xyIndex, 1)
        }
      }
    }
  };

  // last column
  for (yIndex = 0; yIndex < coordinateGrid.length; yIndex++) {
    if (coordinateGrid[yIndex][coordinateGrid[0].length - 1].manhattenDistanceToClosest > 0) {
      for (xyIndex = 0; xyIndex < xyArray.length; xyIndex++) {
        if (xyArray[xyIndex].xCoord === coordinateGrid[yIndex][coordinateGrid[0].length - 1].closestTargetX &&
                    xyArray[xyIndex].yCoord === coordinateGrid[yIndex][coordinateGrid[0].length - 1].closestTargetY) {
          xyArray.splice(xyIndex, 1)
        }
      }
    }
  };
}

function mostElements (coordArray) {
  var xyArray = parseArray(coordArray)
  var targetGrid = calculateManhattenDistances(coordArray)
  eliminateInfinites(targetGrid, xyArray)

  var highestElementCount = 0
  for (var xyIndex = 0; xyIndex < xyArray.length; xyIndex++) {
    var numberOfElements = 0
    for (var gridY = 0; gridY < targetGrid.length; gridY++) {
      for (var gridX = 0; gridX < targetGrid[0].length; gridX++) {
        if (xyArray[xyIndex].xCoord === targetGrid[gridY][gridX].closestTargetX &&
                   xyArray[xyIndex].yCoord === targetGrid[gridY][gridX].closestTargetY) {
          numberOfElements++
        }
      }
    }
    if (numberOfElements > highestElementCount) {
      highestElementCount = numberOfElements
    }
  }

  return highestElementCount
}

function sumManhattenDistances (coordArray, elementX, elementY) {
  var xyArray = parseArray(coordArray)
  var sumOfManhattenDistances = 0
  for (var xyIndex = 0; xyIndex < xyArray.length; xyIndex++) {
    sumOfManhattenDistances += Math.abs(elementX - xyArray[xyIndex].xCoord) + Math.abs(elementY - xyArray[xyIndex].yCoord)
  }

  return sumOfManhattenDistances
}

function findCloseElements (coordArray, sumLimit) {
  var xyArray = parseArray(coordArray)
  var minMaxObject = findMinMax(xyArray)
  var closeElements = 0
  var yLength = minMaxObject.yMax + 2
  var xLength = minMaxObject.xMax + 2
  for (var gridY = 0; gridY < yLength; gridY++) {
    for (var gridX = 0; gridX < xLength; gridX++) {
      if (sumManhattenDistances(coordArray, gridX, gridY) < sumLimit) {
        closeElements++
      }
    }
  }
  return closeElements
}

exports.parseArray = parseArray
exports.findMinMax = findMinMax
exports.createGrid = createGrid
exports.calculateManhattenDistances = calculateManhattenDistances
exports.eliminateInfinites = eliminateInfinites
exports.mostElements = mostElements
exports.sumManhattenDistances = sumManhattenDistances
exports.findCloseElements = findCloseElements
