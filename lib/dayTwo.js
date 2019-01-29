function countLetters(boxID) {
    
    var uniqueLetters = [];
    var letterCounts = [];
    if(!boxID[0]){
        return -1;
    }
    
    for(i = 0; i < boxID.length; i++){
        charIndex = uniqueLetters.indexOf(boxID[i]);
        // console.log("charIndex = " + charIndex);
        if(charIndex === -1){
            uniqueLetters.push(boxID[i])
            // console.log("uniqueLetters" + "** " + uniqueLetters + "**")
            // console.log("letterCounts" + "** " + letterCounts + "**")
            // console.log("indexOf(boxID[i])" + "** " + uniqueLetters.indexOf(boxID[i]) + "**")
            
            letterCounts[uniqueLetters.indexOf(boxID[i])] = 1
        }else{
            letterCounts[charIndex]++
        }
    }
    
    return letterCounts;
}
function countLines(boxIDs, numberToCount) {
    var countOfLines = 0;
    for(j = 0; j < boxIDs.length; j++){
        var letterCounts = [];
        letterCounts = countLetters(boxIDs[j]);
        if(letterCounts.indexOf(numberToCount) !== -1){
            countOfLines++
        }
    }
    return countOfLines;

}

function getCheckSum(boxIDs){
    return countLines(boxIDs, 2) * countLines(boxIDs, 3);
}

function getCloseMatchIDString(boxIDs){

    for(boxIDsOuterIndex = 0; boxIDsOuterIndex < boxIDs.length - 1; boxIDsOuterIndex++){
        //for each row (boxIDsOuterIndex) loop through every row (boxIDsInnerIndex) looking for  
        //the first two rows that match all but one character
        for(boxIDsInnerIndex = 0; boxIDsInnerIndex < boxIDs.length; boxIDsInnerIndex++){
            var diffChars = 0
            for(eachCharIndex = 0; eachCharIndex < boxIDs[0].length; eachCharIndex++){
                if(boxIDs[boxIDsOuterIndex][eachCharIndex] !== boxIDs[boxIDsInnerIndex][eachCharIndex]){
                    diffChars++;
                }
                if(diffChars > 1){
                    break
                }
            }  
            if(diffChars === 1){
                 return getStringOfMatchingChars(boxIDs[boxIDsOuterIndex], boxIDs[boxIDsInnerIndex]);
            }      
        }
 
    }

return null;
}

function getStringOfMatchingChars(boxID1, boxID2){
    var stringOfMatchingChars = "";
    //create a string of only those characters that match between the two strings
    for(charI = 0; charI < boxID1.length; charI++){
        if (boxID1[charI] === boxID2[charI]){
            stringOfMatchingChars = stringOfMatchingChars + boxID1[charI]
        }
    }

    return stringOfMatchingChars;

}


if (exports) {

    exports.countLetters = countLetters; 
    exports.countLines = countLines;
    exports.getCheckSum = getCheckSum;
    exports.getCloseMatchIDString = getCloseMatchIDString;
    exports.getStringOfMatchingChars = getStringOfMatchingChars;


}