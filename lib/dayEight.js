
function sumMetaData(licenseNodeDataArray){
    var nodeObject = {nodeArray: licenseNodeDataArray, nodeIndex: 0, runningSum: 0, arrayIndex: 0 };
    sumEachNode(nodeObject);
    return nodeObject.runningSum;
}

function sumEachNode(nodeObject){
    
    var numChildren = parseInt(nodeObject.nodeArray[nodeObject.nodeIndex]);
    nodeObject.arrayIndex++;
    var numMetaData = parseInt(nodeObject.nodeArray[nodeObject.arrayIndex]);
    nodeObject.arrayIndex++;
    
    while(numChildren > 0){
        nodeObject.nodeIndex = nodeObject.arrayIndex;
        sumEachNode(nodeObject);
        numChildren--;
    };
    
    while(numMetaData > 0){
        nodeObject.runningSum += parseInt(nodeObject.nodeArray[nodeObject.arrayIndex]);
        nodeObject.arrayIndex++;
        numMetaData--;
    };     
}

function sumTree(licenseNodeDataArray){
    var nodeObject = {nodeArray: licenseNodeDataArray, nodeIndex: 0, nodeValue: 0, arrayIndex: 0 };
    sumNode(nodeObject);
    return nodeObject.nodeValue;
}
function sumNode(nodeObject){
    
    var numChildren = parseInt(nodeObject.nodeArray[nodeObject.nodeIndex]);
    nodeObject.arrayIndex++;
    var numMetaData = parseInt(nodeObject.nodeArray[nodeObject.arrayIndex]);
    nodeObject.arrayIndex++;
    
    var childArray = [];

    while(numChildren > 0){
        nodeObject.nodeIndex = nodeObject.arrayIndex;
        sumNode(nodeObject);  //warning - recursion
        childArray.push(nodeObject.nodeValue);
        nodeObject.nodeValue = 0;
        numChildren--;
    };
    
    if(childArray.length > 0){
        while(numMetaData > 0){
            childIndex = parseInt(nodeObject.nodeArray[nodeObject.arrayIndex]) - 1;
            if(childIndex < childArray.length){
                nodeObject.nodeValue += childArray[childIndex];
            }            
            nodeObject.arrayIndex++;
            numMetaData--;
        };     

    } else {
        while(numMetaData > 0){
            nodeObject.nodeValue += parseInt(nodeObject.nodeArray[nodeObject.arrayIndex]);
            nodeObject.arrayIndex++;
            numMetaData--;
        };   
    }
}

exports.sumMetaData = sumMetaData;
exports.sumEachNode = sumEachNode;
exports.sumTree = sumTree;