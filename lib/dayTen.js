function parseData(positionVelocityArray){
    var positionVelocityObjectArray = [];
    for(i = 0; i < positionVelocityArray.length; i++){
        positionVelocityData = positionVelocityArray[i].split(/position=<|>|velocity=<|,/g);
        var positionVelocityObject = {
            posX: parseInt(positionVelocityData[1]),
            posY: parseInt(positionVelocityData[2]),
            velX: parseInt(positionVelocityData[4]),
            velY: parseInt(positionVelocityData[5])
        }
        positionVelocityObjectArray.push(positionVelocityObject);
    }
    return positionVelocityObjectArray;
};

function renderDisplay(positionVelocityObjectArray){

    var arrayObject = findDimensions(positionVelocityObjectArray);
    var pointArray = populateArray(positionVelocityObjectArray, arrayObject);
    var render = "\n\n";
    
    for( var y = 0; y < arrayObject.height; y++){
        render += "  ";
        for(var x = 0; x < arrayObject.width; x++){
            render += pointArray[y][x];
        }
        render += "  \n";
    }
    render += "\n";

    return render;
}

function findDimensions(positionVelocityObjectArray){

    var arrayObject = {minX: 0, maxX: 0, minY: 0, maxY: 0, width: 0, height: 0};

    for(i = 0; i < positionVelocityObjectArray.length; i++){
        if(positionVelocityObjectArray[i].posX < arrayObject.minX){
            arrayObject.minX = positionVelocityObjectArray[i].posX;
        }
        if(positionVelocityObjectArray[i].posX > arrayObject.maxX){
            arrayObject.maxX = positionVelocityObjectArray[i].posX;
        }
        if(positionVelocityObjectArray[i].posY < arrayObject.minY){
            arrayObject.minY = positionVelocityObjectArray[i].posY;
        }
        if(positionVelocityObjectArray[i].posY > arrayObject.maxY){
            arrayObject.maxY = positionVelocityObjectArray[i].posY;
        }
            
    }
    arrayObject.width = Math.abs(arrayObject.minX) +  Math.abs(arrayObject.maxX) + 1;
    arrayObject.height = Math.abs(arrayObject.minY) +  Math.abs(arrayObject.maxY) + 1;

    return arrayObject;

};

function createBlankArray(arrayObject){

    var pointArray = []
    console.log("Y " + arrayObject.height + " X " + arrayObject.width)
    for(y = 0; y < arrayObject.height; y++){

        pointArray.push([]);
        for(x = 0; x < arrayObject.width; x++){
            pointArray[y].push(".");
        };
    };

    return pointArray;
};

function populateArray(positionVelocityObjectArray, arrayObject){

    var pointArray = createBlankArray(arrayObject);
    yAdjust = arrayObject.minY < 0 ? Math.abs(arrayObject.minY): 0;
    xAdjust = arrayObject.minX < 0 ? Math.abs(arrayObject.minX): 0;

    for(var i = 0; i < positionVelocityObjectArray.length; i++){
        var yCoord = positionVelocityObjectArray[i].posY + yAdjust;
        var xCoord = positionVelocityObjectArray[i].posX + xAdjust;
        pointArray[yCoord][xCoord] = "#"; 
    }

    return pointArray;

}

function advanceLights(positionVelocityObjectArray, moveForward){

    for(var i = 0; i < positionVelocityObjectArray.length; i++){
        positionVelocityObjectArray[i].posX += (positionVelocityObjectArray[i].velX * moveForward);
        positionVelocityObjectArray[i].posY += (positionVelocityObjectArray[i].velY * moveForward);
    }     
 
    return positionVelocityObjectArray;

}




exports.parseData = parseData;
exports.findDimensions = findDimensions;
exports.createBlankArray = createBlankArray;
exports.populateArray = populateArray;
exports.renderDisplay = renderDisplay;
exports.advanceLights = advanceLights;
