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
  for (var i=0; i<rulesArray.length; i++){
    if(rulesArray[i]==pots)
      thisPlantLives = true
  }
  
  return thisPlantLives
}

function multipleGenerations(initialGenerationArray, rulesArray, numGenerations){
  var finalGeneration = initialGenerationArray.slice()
  for(var i=0; i<numGenerations; i++){
    finalGeneration = nextGeneration(finalGeneration, rulesArray)
  }
  console.log(finalGeneration)
  return finalGeneration

}

function nextGeneration (currentGenerationArray, rulesArray) {
  var nextGenerationArray = ['.', '.']
  for(var i=2; i<currentGenerationArray.length - 2; i++){
    var pots = currentGenerationArray[i-2] + currentGenerationArray[i-1] + currentGenerationArray[i] + currentGenerationArray[i + 1] + currentGenerationArray[i + 2]
    thisPlantLives = doesThisPlantLive(pots, rulesArray)
    var plant = '.'
    if(thisPlantLives){
      plant = '#'
    }
    nextGenerationArray.push(plant)
  }
  nextGenerationArray.push(currentGenerationArray[currentGenerationArray.length - 2])
  nextGenerationArray.push(currentGenerationArray[currentGenerationArray.length - 1])
  return nextGenerationArray
}

exports.multipleGenerations = multipleGenerations
exports.extractRulesArray = extractRulesArray
exports.initializeGenerationArray = initializeGenerationArray
exports.doesThisPlantLive = doesThisPlantLive
exports.nextGeneration = nextGeneration