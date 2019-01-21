
function adjust(frequencyChanges) {
    var frequency = 0;
    for (i = 0; i < frequencyChanges.length; i++){
        frequency += frequencyChanges[i];
    }

    return frequency;
}

if (exports) {

    exports.adjust = adjust;
}
