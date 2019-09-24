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
  var initialGeneration = []
  var workingArray = initialPlants.split(' ')
  var initialPlantsArray = workingArray[2].split('')
  return initialGeneration
}

exports.extractRulesArray = extractRulesArray
exports.initializeGenerationArray = initializeGenerationArray
