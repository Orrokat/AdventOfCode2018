
function adjust(frequencyChanges) {
    var frequency = 0;
    for (i = 0; i < frequencyChanges.length; i++){
        var changeInt = parseInt(frequencyChanges[i]);
        if (isNaN(changeInt))
            console.log("invalid data record " + i);
        else    
            frequency += changeInt;
    }

    return frequency;
}

if (exports) {

    exports.adjust = adjust;
}
