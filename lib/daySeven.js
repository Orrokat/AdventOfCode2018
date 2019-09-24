
function parseDependencies (dependencyStrings) {
  var stepDependenciesArray = []
  for (var stepIndex = 0; stepIndex < dependencyStrings.length; stepIndex++) {
    var dependencyObject = { step: 0, dependency: 0 }
    var wordArray = dependencyStrings[stepIndex].split(/\s/gm)
    dependencyObject.step = wordArray[7]
    dependencyObject.dependency = wordArray[1]
    stepDependenciesArray.push(dependencyObject)
  };

  return stepDependenciesArray
};

function sortStepArray (stepArray) {
  var sortedStepArray =
        stepArray.sort(function (a, b) {
          if (a.step > b.step) { return 1 }
          if (a.step === b.step) { return 0 }
          if (a.step < b.step) { return -1 }
        })
  return sortedStepArray
};

function createBaseStepArray (stepArray) {
  var allSteps = []
  var allStepsWithDependencies = []
  for (var i = 0; i < stepArray.length; i++) {
    var stepObj
    if (allSteps.indexOf(stepArray[i].step) === -1) {
      allSteps.push(stepArray[i].step) // indexOf doesn't work with the object
      stepObj = { step: stepArray[i].step, dependencies: [] }
      allStepsWithDependencies.push(stepObj)
    }
    if (allSteps.indexOf(stepArray[i].dependency) === -1) {
      allSteps.push(stepArray[i].dependency) // indexOf doesn't work with the object
      stepObj = { step: stepArray[i].dependency, dependencies: [] }
      allStepsWithDependencies.push(stepObj)
    }
  }
  var allStepsSorted = sortStepArray(allStepsWithDependencies)
  return allStepsSorted
}

function createStepDependenciesArray (stepArray) {
  var stepDependenciesArray = createBaseStepArray(stepArray)
  var sortedStepArray = sortStepArray(stepArray)
  for (var stepIndex = 0; stepIndex < sortedStepArray.length; stepIndex++) {
    for (var stepDependnciesIndex = 0; stepDependnciesIndex < stepDependenciesArray.length; stepDependnciesIndex++) {
      if (sortedStepArray[stepIndex].step === stepDependenciesArray[stepDependnciesIndex].step) {
        stepDependenciesArray[stepDependnciesIndex].dependencies.push(sortedStepArray[stepIndex].dependency)
        break
      }
    }
  }

  return stepDependenciesArray
}
function findStepOrder (dependencyStrings) {
  var stepArray = parseDependencies(dependencyStrings)
  var stepDependenciesArray = createStepDependenciesArray(stepArray)
  var stepOrder = ''

  while (stepDependenciesArray.length > 0) {
    var nextStep = ''
    for (var stepDependnciesIndex = 0; stepDependnciesIndex < stepDependenciesArray.length; stepDependnciesIndex++) {
      if (stepDependenciesArray[stepDependnciesIndex].dependencies.length === 0) {
        nextStep = stepDependenciesArray[stepDependnciesIndex].step
        stepDependenciesArray.splice(stepDependnciesIndex, 1)
        break
      }
    }
    for (stepDependnciesIndex = 0; stepDependnciesIndex < stepDependenciesArray.length; stepDependnciesIndex++) {
      var remove = stepDependenciesArray[stepDependnciesIndex].dependencies.indexOf(nextStep)
      if (remove > -1) {
        stepDependenciesArray[stepDependnciesIndex].dependencies.splice(remove, 1)
      }
    }

    stepOrder += nextStep
    nextStep = ''
  }

  return stepOrder
}

function createDurationArray (stepDependenciesArray, durationOffset) {
  var durationArray = []

  for (var stepDependnciesIndex = 0; stepDependnciesIndex < stepDependenciesArray.length; stepDependnciesIndex++) {
    var durationObject = { duration: stepDependnciesIndex + durationOffset + 1, started: false, worker: -1 }
    durationArray.push(durationObject)
  }

  return durationArray
}

function createWorkerArray (numberWorkers) {
  var workerWorkingArray = []
  for (var workerIndex = 0; workerIndex < numberWorkers; workerIndex++) {
    workerWorkingArray[workerIndex] = false
  }
  return workerWorkingArray
}

function findSecondsToFinish (dependencyStrings, numberWorkers, durationOffset) {
  var stepArray = parseDependencies(dependencyStrings)
  var stepDependenciesArray = createStepDependenciesArray(stepArray)
  var durationArray = createDurationArray(stepDependenciesArray, durationOffset)
  var workerWorkingArray = createWorkerArray(numberWorkers)
  var duration = 0

  while (stepDependenciesArray.length > 0) {
    // decrement the duration for started steps
    for (var durationIndex = 0; durationIndex < durationArray.length; durationIndex++) {
      if (durationArray[durationIndex].started) {
        durationArray[durationIndex].duration--
      }
    }
    // find and remove completed steps in the array
    // starting from the end allows me to remove multiple steps in the same round
    var completedSteps = []
    for (durationIndex = durationArray.length - 1; durationIndex > -1; durationIndex--) {
      if (durationArray[durationIndex].started && durationArray[durationIndex].duration === 0) {
        completedSteps.push(stepDependenciesArray[durationIndex].step)
        workerWorkingArray[durationArray[durationIndex].worker] = false
        stepDependenciesArray.splice(durationIndex, 1)
        durationArray.splice(durationIndex, 1)
      }
    }

    // if all the steps are gone we are finished
    if (stepDependenciesArray.length === 0) { continue }

    // remove completed steps from the dependencies of each step
    if (completedSteps.length !== 0) {
      for (var stepDependnciesIndex = 0; stepDependnciesIndex < stepDependenciesArray.length; stepDependnciesIndex++) {
        for (var completedIndex = 0; completedIndex < completedSteps.length; completedIndex++) {
          var remove = stepDependenciesArray[stepDependnciesIndex].dependencies.indexOf(completedSteps[completedIndex])
          if (remove > -1) {
            stepDependenciesArray[stepDependnciesIndex].dependencies.splice(remove, 1)
          }
        }
      }
    }
    // start steps that are ready
    for (durationIndex = 0; durationIndex < durationArray.length; durationIndex++) {
      if (stepDependenciesArray[durationIndex].dependencies.length === 0 && !durationArray[durationIndex].started) {
        for (var i = 0; i < workerWorkingArray.length; i++) {
          // only start if there is an available worker
          if (!workerWorkingArray[i]) {
            durationArray[durationIndex].worker = i
            workerWorkingArray[i] = true
            durationArray[durationIndex].started = true
            break
          }
        }
      }
    }

    duration++
  }

  return duration
}

exports.parseDependencies = parseDependencies
exports.sortStepArray = sortStepArray
exports.createBaseStepArray = createBaseStepArray
exports.createStepDependenciesArray = createStepDependenciesArray
exports.findStepOrder = findStepOrder
exports.createDurationArray = createDurationArray
exports.createWorkerArray = createWorkerArray
exports.findSecondsToFinish = findSecondsToFinish
