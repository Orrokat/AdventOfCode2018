
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
    } 
     
}

exports.sumMetaData = sumMetaData;
exports.sumEachNode = sumEachNode;