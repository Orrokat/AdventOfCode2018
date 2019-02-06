var dataUtil = require("../lib/dataUtil.js");
function parseLog(logEntry) {
    var logEntryDataArray = logEntry.split(/#|\[|:|\s|\]/g);
    return logEntryDataArray;
}
function parseAllLogs(logArray) {
    var parsedArray = [];
    for(logIndex = 0; logIndex < logArray.length; logIndex++){
        parsedArray.push(parseLog(logArray[logIndex]))
    }

    return parsedArray;
}
function extractRelevantData(extractedArray) {
    var guardIncidentArray = [];
    var guard = 0;
    var incidentDate = null;
    var sleep = 0;
    var wakes = 0;
    for(logIndex = 0; logIndex < extractedArray.length; logIndex++){
        if(extractedArray[logIndex][5] === "Guard"){
            guard = parseInt(extractedArray[logIndex][7]);
        }else
        if(extractedArray[logIndex][5] === "falls"){
            incidentDate = extractedArray[logIndex][1];
            sleep = parseInt(extractedArray[logIndex][3]);
        }else
        if(extractedArray[logIndex][5] === "wakes"){
            wakes = parseInt(extractedArray[logIndex][3]);
            guardIncidentArray.push({guard: guard,
                                     incidentDate: incidentDate,
                                     sleep: sleep,
                                     wakes: wakes});
        }else
            console.log("invalid data ******* " + extractedArray[logIndex]) 
    }

    return guardIncidentArray;
}

function sortIncidentByGuard(inputIncidentObjects){

    return inputIncidentObjects.sort(function (a, b){
        return a.guard - b.guard;
    });

}
function sumGuardByIncident(incidentObjects){

    var guardSumArray = [];
    var minuteMap = [];
    var currentGuard = 0;
    var totalMinutes = 0;
    var currentDate = "";
    var totalDays = 0;
    for(incidentIndex = 0; incidentIndex < incidentObjects.length; incidentIndex++){
        if(currentGuard != incidentObjects[incidentIndex].guard){
            if(currentGuard !== 0){
                guardSumArray.push({guard: currentGuard,
                                    daysWorked: totalDays,
                                    totalMinutesSlept: totalMinutes,
                                    minuteMap: minuteMap});
            };
            minuteMap = makeBlankMinuteMap();
            currentGuard = incidentObjects[incidentIndex].guard;
            totalDays = 0;
            totalMinutes = 0;
        };
        if(currentDate !== incidentObjects[incidentIndex].incidentDate){
            totalDays++;
            currentDate = incidentObjects[incidentIndex].incidentDate;
        }
        
        totalMinutes += incidentObjects[incidentIndex].wakes - incidentObjects[incidentIndex].sleep;
        for(minIndex = incidentObjects[incidentIndex].sleep; minIndex < incidentObjects[incidentIndex].wakes; minIndex++){
            minuteMap[minIndex]++;
        }
    }
    //push last record since the loop will have kicked us out
    guardSumArray.push({guard: currentGuard,
        daysWorked: totalDays,
        totalMinutesSlept: totalMinutes,
        minuteMap: minuteMap});


    return guardSumArray;

}
function makeBlankMinuteMap(){
    newMinuteMap = [];
    for(i = 0; i < 60; i++){
        newMinuteMap.push(0);
    }
    return newMinuteMap;
}
function puzzleSolutionStrategy1(summaryObjects){
    var guardWithMostMinutes = 0;
    var mostMinutes = 0;
    var indexForGuard = 0;
    var minuteSleptMost = 0;
    var timesSlept = 0;
    for(guardIndex = 0; guardIndex < summaryObjects.length; guardIndex++){
        if(summaryObjects[guardIndex].totalMinutesSlept > mostMinutes){
            guardWithMostMinutes = summaryObjects[guardIndex].guard;
            mostMinutes = summaryObjects[guardIndex].totalMinutesSlept;
            indexForGuard = guardIndex;
        }
    }
    for(minIndex = 0; minIndex < 60; minIndex++){
        if(summaryObjects[indexForGuard].minuteMap[minIndex] > timesSlept){
            minuteSleptMost = minIndex;
            timesSlept = summaryObjects[indexForGuard].minuteMap[minIndex];
        }
    }
    return minuteSleptMost * guardWithMostMinutes;
}

function puzzleSolutionStrategy2(summaryObjects){
   
    var guardWithHighestMinute = 0;
    var overAllMinuteSleptMost = 0;
    var overAllTimesSlept = 0;
 
    for(guardIndex = 0; guardIndex < summaryObjects.length; guardIndex++){
        var minuteSleptMost = 0;
        var timesSlept = 0;
        for(minIndex = 0; minIndex < 60; minIndex++){
            if(summaryObjects[guardIndex].minuteMap[minIndex] > timesSlept){
                minuteSleptMost = minIndex;
                timesSlept = summaryObjects[guardIndex].minuteMap[minIndex];
            }
        }
        if(timesSlept > overAllTimesSlept){
            overAllMinuteSleptMost = minuteSleptMost;
            overAllTimesSlept = timesSlept;
            guardWithHighestMinute = summaryObjects[guardIndex].guard;
        }
    }
    return overAllMinuteSleptMost * guardWithHighestMinute;
}
function solveThePuzzleDay4a(arrayOfLogs){
    return puzzleSolutionStrategy1(sumGuardByIncident(sortIncidentByGuard(extractRelevantData(parseAllLogs(dataUtil.arraySort(arrayOfLogs))))));
}
function solveThePuzzleDay4b(arrayOfLogs){
    return puzzleSolutionStrategy2(sumGuardByIncident(sortIncidentByGuard(extractRelevantData(parseAllLogs(dataUtil.arraySort(arrayOfLogs))))));
}

exports.parseLog = parseLog; 
exports.parseAllLogs = parseAllLogs;
exports.extractRelevantData = extractRelevantData;
exports.sortIncidentByGuard = sortIncidentByGuard;
exports.sumGuardByIncident = sumGuardByIncident;
exports.puzzleSolutionStrategy1 = puzzleSolutionStrategy1;
exports.puzzleSolutionStrategy2 = puzzleSolutionStrategy2;
exports.solveThePuzzleDay4a = solveThePuzzleDay4a;
exports.solveThePuzzleDay4b = solveThePuzzleDay4b;

