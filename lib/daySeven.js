

function parseDependencies(dependencyStrings) {

    var stepDependenciesArray = [];
    for(var stepIndex = 0; stepIndex < dependencyStrings.length; stepIndex++){
        var dependencyObject = {step: 0, dependency: 0};
        var wordArray = dependencyStrings[stepIndex].split(/\s/gm);
        dependencyObject.step = wordArray[7];
        dependencyObject.dependency = wordArray[1];
        stepDependenciesArray.push(dependencyObject);
    };

    return stepDependenciesArray;
};

function sortStepArray(stepArray){
    sortedStepArray = 
    stepArray.sort(function (a, b){
        if(a.step > b.step)
            return 1;
        if(a.step === b.step)
            return 0;
        if(a.step < b.step)
            return -1;              
    });
    return sortedStepArray; 

};

function createBaseStepArray(stepArray){
    var allSteps = [];
    var allStepsWithDependencies = [];
    for(var i = 0; i < stepArray.length; i++){
        
        if(allSteps.indexOf(stepArray[i].step ) === -1){
            allSteps.push(stepArray[i].step); //indexOf doesn't work with the object
            var stepObj = {step: stepArray[i].step, dependencies: []};
            allStepsWithDependencies.push(stepObj);
        }
        if(allSteps.indexOf(stepArray[i].dependency )  === -1){
            allSteps.push(stepArray[i].dependency); //indexOf doesn't work with the object
            var stepObj = {step: stepArray[i].dependency, dependencies: []};
            allStepsWithDependencies.push(stepObj);
        }
    }
    var allStepsSorted = sortStepArray(allStepsWithDependencies);
    return allStepsSorted;

}

function createStepDependenciesArray(stepArray){
    var stepDependenciesArray = createBaseStepArray(stepArray);
    var sortedStepArray = sortStepArray(stepArray);
    for(var stepIndex = 0; stepIndex < sortedStepArray.length; stepIndex++){
        for(var stepDependnciesIndex = 0; stepDependnciesIndex < stepDependenciesArray.length; stepDependnciesIndex++){
            if(sortedStepArray[stepIndex].step === stepDependenciesArray[stepDependnciesIndex].step){
                stepDependenciesArray[stepDependnciesIndex].dependencies.push(sortedStepArray[stepIndex].dependency);
                break;
            }
        }
    }

    return stepDependenciesArray;
}
function findStepOrder(dependencyStrings){
    var stepArray = parseDependencies(dependencyStrings);
    var stepDependenciesArray = createStepDependenciesArray(stepArray);
    var stepOrder= "";

    while(stepDependenciesArray.length > 0){
        var nextStep = "";
        for(var stepDependnciesIndex = 0; stepDependnciesIndex < stepDependenciesArray.length; stepDependnciesIndex++){
            if(stepDependenciesArray[stepDependnciesIndex].dependencies.length === 0){
                nextStep = stepDependenciesArray[stepDependnciesIndex].step;
                stepDependenciesArray.splice(stepDependnciesIndex,1);
                break;
            }
        }
        for(var stepDependnciesIndex = 0; stepDependnciesIndex < stepDependenciesArray.length; stepDependnciesIndex++){
            remove = stepDependenciesArray[stepDependnciesIndex].dependencies.indexOf(nextStep);
            if(remove > -1){
                stepDependenciesArray[stepDependnciesIndex].dependencies.splice(remove, 1);
            }
        }

        stepOrder += nextStep;
        nextStep = "";
    }

    return stepOrder;

}


exports.parseDependencies = parseDependencies;
exports.sortStepArray = sortStepArray;
exports.createBaseStepArray = createBaseStepArray;
exports.createStepDependenciesArray = createStepDependenciesArray;
exports.findStepOrder = findStepOrder;