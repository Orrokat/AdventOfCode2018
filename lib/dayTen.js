function parseData (positionVelocityArray) {
  var positionVelocityObjectArray = []
  for (var i = 0; i < positionVelocityArray.length; i++) {
    var positionVelocityData = positionVelocityArray[i].split(/position=<|>|velocity=<|,/g)
    var positionVelocityObject = {
      posX: parseInt(positionVelocityData[1]),
      posY: parseInt(positionVelocityData[2]),
      velX: parseInt(positionVelocityData[4]),
      velY: parseInt(positionVelocityData[5])
    }
    positionVelocityObjectArray.push(positionVelocityObject)
  }
  return positionVelocityObjectArray
};

function renderDisplay (positionVelocityObjectArray) {
  var arrayObject = findDimensions(positionVelocityObjectArray)
  var pointArray = populateArray(positionVelocityObjectArray, arrayObject)
  var render = '\n\n'

  for (var y = 0; y < arrayObject.height; y++) {
    render += '  '
    for (var x = 0; x < arrayObject.width; x++) {
      render += pointArray[y][x]
    }
    render += '  \n'
  }
  render += '\n'

  return render
}

function findDimensions (positionVelocityObjectArray) {
  var arrayObject = { minX: positionVelocityObjectArray[0].posX,
    maxX: positionVelocityObjectArray[0].posX,
    minY: positionVelocityObjectArray[0].posY,
    maxY: positionVelocityObjectArray[0].posY,
    width: 0,
    height: 0 }

  for (var i = 0; i < positionVelocityObjectArray.length; i++) {
    if (positionVelocityObjectArray[i].posX < arrayObject.minX) {
      arrayObject.minX = positionVelocityObjectArray[i].posX
    }
    if (positionVelocityObjectArray[i].posX > arrayObject.maxX) {
      arrayObject.maxX = positionVelocityObjectArray[i].posX
    }
    if (positionVelocityObjectArray[i].posY < arrayObject.minY) {
      arrayObject.minY = positionVelocityObjectArray[i].posY
    }
    if (positionVelocityObjectArray[i].posY > arrayObject.maxY) {
      arrayObject.maxY = positionVelocityObjectArray[i].posY
    }
  }

  arrayObject.width = arrayObject.maxX - arrayObject.minX + 1
  arrayObject.height = arrayObject.maxY - arrayObject.minY + 1

  return arrayObject
};

function createBlankArray (arrayObject) {
  var pointArray = []
  for (var y = 0; y < arrayObject.height; y++) {
    pointArray.push([])
    for (var x = 0; x < arrayObject.width; x++) {
      pointArray[y].push('.')
    };
  };

  return pointArray
};

function populateArray (positionVelocityObjectArray, arrayObject) {
  var pointArray = createBlankArray(arrayObject)

  for (var i = 0; i < positionVelocityObjectArray.length; i++) {
    var yCoord = positionVelocityObjectArray[i].posY - arrayObject.minY
    var xCoord = positionVelocityObjectArray[i].posX - arrayObject.minX
    pointArray[yCoord][xCoord] = '#'
  }
  return pointArray
}

function advanceLights (positionVelocityObjectArray, moveForward) {
  for (var i = 0; i < positionVelocityObjectArray.length; i++) {
    positionVelocityObjectArray[i].posX += (positionVelocityObjectArray[i].velX * moveForward)
    positionVelocityObjectArray[i].posY += (positionVelocityObjectArray[i].velY * moveForward)
  }
}

var moveForward = 10900 // had to start this many seconds forward because javascript could not handle the size of the array
function getPointsOfLight (positionVelocityArray) {
  var positionVelocityObjectArray = parseData(positionVelocityArray)
  advanceLights(positionVelocityObjectArray, moveForward)
  var render = renderDisplay(positionVelocityObjectArray)
  moveForward++
  return render
}

exports.parseData = parseData
exports.findDimensions = findDimensions
exports.createBlankArray = createBlankArray
exports.populateArray = populateArray
exports.renderDisplay = renderDisplay
exports.advanceLights = advanceLights
exports.getPointsOfLight = getPointsOfLight
