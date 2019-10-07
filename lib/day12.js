function extractRulesArray (plantExpansionRules) {
  var rulesArray = []
  for (var i = 0; i < plantExpansionRules.length; i++) {
    var workingRule = plantExpansionRules[i].split(' ')
    var newRule = workingRule[0]
    if (workingRule[2] === '#') {
      rulesArray.push(newRule)
    }
  }
  return rulesArray
}
function initializeGenerationArray (initialPlants) {

  var workingArray = initialPlants.split(' ')
  var initialGeneration = workingArray[2].split('')
  initialGeneration.unshift('.', '.', '.', '.') 
  initialGeneration.push('.', '.', '.', '.')
  
  return initialGeneration
}

function doesThisPlantLive (pots, rulesArray) {

  var thisPlantLives = false
  for (i=0; i<rulesArray.length; i++){
    if(rulesArray[i]==pots)
      thisPlantLives = true
  }
  
  return thisPlantLives
}

exports.extractRulesArray = extractRulesArray
exports.initializeGenerationArray = initializeGenerationArray
exports.doesThisPlantLive = doesThisPlantLive