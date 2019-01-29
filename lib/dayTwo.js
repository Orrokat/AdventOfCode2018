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
if (exports) {

    exports.countLetters = countLetters; 
    exports.countLines = countLines;
    exports.getCheckSum = getCheckSum;


}