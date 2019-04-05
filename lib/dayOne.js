
function adjust (frequencyChanges) {
  var frequency = 0
  for (var i = 0; i < frequencyChanges.length; i++) {
    var changeInt = parseInt(frequencyChanges[i])
    if (isNaN(changeInt)) { console.log('invalid data record ' + i) } else { frequency += changeInt }
  }
  return frequency
}

function cycleFrequencyChanges (frequencyChanges, frequency, frequencyArray, iterations) {
  // cycle through the list of frequencies multiple times until a duplicate frequency is found
  iterations++
  for (var i = 0; i < frequencyChanges.length; i++) {
    var changeInt = parseInt(frequencyChanges[i])
    if (isNaN(changeInt)) { console.log('invalid data record ' + i) } else {
      frequency += changeInt
      // see if this frequency is already on the array.  if it is, this is the first duplicate
      if (frequencyArray.indexOf(frequency) !== -1) { return frequency }
      frequencyArray.push(frequency)
      // this is a safety net for the recursive call
      if (iterations > 150) { return null }
    }
  }
  return cycleFrequencyChanges(frequencyChanges, frequency, frequencyArray, iterations)
}

exports.adjust = adjust
exports.cycleFrequencyChanges = cycleFrequencyChanges
