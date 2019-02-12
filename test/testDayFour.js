var assert = require('assert');
var dayFour = require("../lib/dayFour.js");


describe('dayFour', function () {

    describe('dayFour.parseLog - given a single input string of the Guard type', function () {
        it('it should return an array with the individual bits of data', function() {
            var inputString = "[1518-11-01 00:00] Guard #10 begins shift";
            var extractedDataArray = dayFour.parseLog(inputString);
            var expectedArray = [ 
                '',
                '1518-11-01',
                '00',
                '00',
                '',
                'Guard',
                '',
                '10',
                'begins',
                'shift' ];
                
                
            assert.deepEqual(extractedDataArray, expectedArray);
            
        });
    });
    describe('dayFour.parseLog - given a single input string of the falls asleep type', function () {
        it('it should return an array with the individual bits of data', function() {
            var inputString = "[1518-11-01 00:05] falls asleep";
            var extractedDataArray = dayFour.parseLog(inputString);
            var expectedArray = [ 
                '',
                '1518-11-01',
                '00',
                '05',
                '',
                'falls',
                'asleep'
                 ];
                
                
            assert.deepEqual(extractedDataArray, expectedArray);
            
        });
    });
    describe('dayFour.parseAllLogs - given a sorted array of input strings of all types', function () {
        it('it should return an array with an array for each input item', function() {
            var sortedArray = [
                "[1518-11-01 00:00] Guard #10 begins shift",
                "[1518-11-01 00:05] falls asleep",
                "[1518-11-01 00:25] wakes up",
                "[1518-11-01 00:30] falls asleep",
                "[1518-11-01 00:55] wakes up",
                "[1518-11-01 23:58] Guard #99 begins shift",
                "[1518-11-02 00:40] falls asleep",
                "[1518-11-02 00:50] wakes up",
                "[1518-11-03 00:05] Guard #10 begins shift",
                "[1518-11-03 00:24] falls asleep",
                "[1518-11-03 00:29] wakes up",
                "[1518-11-04 00:02] Guard #99 begins shift",
                "[1518-11-04 00:36] falls asleep",
                "[1518-11-04 00:46] wakes up",
                "[1518-11-05 00:03] Guard #99 begins shift",
                "[1518-11-05 00:45] falls asleep",
                "[1518-11-05 00:55] wakes up",
                "[1518-11-06 00:03] Guard #1023 begins shift",
                "[1518-11-06 00:25] falls asleep",
                "[1518-11-06 00:51] wakes up"                                       
            ];
            var extractedDataArray = dayFour.parseAllLogs(sortedArray);
            var expectedArray = [ 
                ['', '1518-11-01', '00', '00', '', 'Guard', '', '10', 'begins', 'shift'],
                ['', '1518-11-01', '00', '05', '', 'falls', 'asleep'],
                ['', '1518-11-01', '00', '25', '', 'wakes', 'up'],
                ['', '1518-11-01', '00', '30', '', 'falls', 'asleep'],
                ['', '1518-11-01', '00', '55', '', 'wakes', 'up'],
                ['', '1518-11-01', '23', '58', '', 'Guard', '', '99', 'begins', 'shift'],
                ['', '1518-11-02', '00', '40', '', 'falls', 'asleep'],
                ['', '1518-11-02', '00', '50', '', 'wakes', 'up'],
                ['', '1518-11-03', '00', '05', '', 'Guard', '', '10', 'begins', 'shift'],
                ['', '1518-11-03', '00', '24', '', 'falls', 'asleep'],
                ['', '1518-11-03', '00', '29', '', 'wakes', 'up'],
                ['', '1518-11-04', '00', '02', '', 'Guard', '', '99', 'begins', 'shift'],
                ['', '1518-11-04', '00', '36', '', 'falls', 'asleep'],
                ['', '1518-11-04', '00', '46', '', 'wakes', 'up'],
                ['', '1518-11-05', '00', '03', '', 'Guard', '', '99', 'begins', 'shift'],
                ['', '1518-11-05', '00', '45', '', 'falls', 'asleep'],
                ['', '1518-11-05', '00', '55', '', 'wakes', 'up'],
                ['', '1518-11-06', '00', '03', '', 'Guard', '', '1023', 'begins', 'shift'],
                ['', '1518-11-06', '00', '25', '', 'falls', 'asleep'],
                ['', '1518-11-06', '00', '51', '', 'wakes', 'up'],

                 ];
                
                
            assert.deepEqual(extractedDataArray, expectedArray);
            
        });
    });
    
    describe('dayFour.sortIncidentsByGuard - given an array of incident objects', function () {
        it('it should return an array of objects sorted by guard number', function() {

            var inputIncidentObjects = [
                {guard: 10, incidentDate: '1518-11-01', sleep: 5, wakes: 25},
                {guard: 10, incidentDate: '1518-11-01', sleep: 30, wakes: 55},
                {guard: 99, incidentDate: '1518-11-02', sleep: 40, wakes: 50},
                {guard: 10, incidentDate: '1518-11-03', sleep: 24, wakes: 29},
                {guard: 99, incidentDate: '1518-11-04', sleep: 36, wakes: 46},
                {guard: 99, incidentDate: '1518-11-05', sleep: 45, wakes: 55},
                {guard: 1023, incidentDate: '1518-11-06', sleep: 25, wakes: 51},
            ];

            var expectedIncidentObjects = [
                {guard: 10, incidentDate: '1518-11-01', sleep: 5, wakes: 25},
                {guard: 10, incidentDate: '1518-11-01', sleep: 30, wakes: 55},
                {guard: 10, incidentDate: '1518-11-03', sleep: 24, wakes: 29},
                {guard: 99, incidentDate: '1518-11-02', sleep: 40, wakes: 50},
                {guard: 99, incidentDate: '1518-11-04', sleep: 36, wakes: 46},
                {guard: 99, incidentDate: '1518-11-05', sleep: 45, wakes: 55},
                {guard: 1023, incidentDate: '1518-11-06', sleep: 25, wakes: 51},
            ];

            var guardIncidentObjects = dayFour.sortIncidentByGuard(inputIncidentObjects);
                
            assert.deepEqual(guardIncidentObjects, expectedIncidentObjects);
            
        });
    });

    describe('dayFour.sumGuardByIncident - given an array of incident objects sorted by guard', function () {
        it('should return an array of one object per guard with summary information', function() {


            var inputIncidentObjects = [
                {guard: 10, incidentDate: '1518-11-01', sleep: 5, wakes: 25},
                {guard: 10, incidentDate: '1518-11-01', sleep: 30, wakes: 55},
                {guard: 10, incidentDate: '1518-11-03', sleep: 24, wakes: 29},
                {guard: 99, incidentDate: '1518-11-02', sleep: 40, wakes: 50},
                {guard: 99, incidentDate: '1518-11-04', sleep: 36, wakes: 46},
                {guard: 99, incidentDate: '1518-11-05', sleep: 45, wakes: 55}

            ];

            var expectedSummaryObjects = [
                {guard: 10, daysWorked: 2, totalMinutesSlept: 50, 
                minuteMap: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
                            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]},
                {guard: 99, daysWorked: 3, totalMinutesSlept: 30, 
                minuteMap: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]}

            ];

            var guardSummaryObjects = dayFour.sumGuardByIncident(inputIncidentObjects);
                
            assert.deepEqual(guardSummaryObjects, expectedSummaryObjects);
            
        });
    });

    describe('dayFour.puzzleSolutionStrategy1 - given an array of guard summary objects', function () {
        it('should return the answer of guard with the most minutes times the minute most represented', function() {


            var inputSummaryObjects = [
                {guard: 10, daysWorked: 2, totalMinutesSlept: 50, 
                minuteMap: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
                            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]},
                {guard: 99, daysWorked: 3, totalMinutesSlept: 30, 
                minuteMap: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]}

            ];

            var puzzleAnswer = dayFour.puzzleSolutionStrategy1(inputSummaryObjects);
            var expectedPuzzleAnswer = 240;
                
            assert.deepEqual(puzzleAnswer, expectedPuzzleAnswer);
            
        });
    });
    describe('dayFour.puzzleSolutionStrategy2 - given an array of guard summary objects', function () {
        it('should return the answer of guard with the minute most slept times the minute most slept', function() {


            var inputSummaryObjects = [
                {guard: 10, daysWorked: 2, totalMinutesSlept: 50, 
                minuteMap: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
                            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]},
                {guard: 99, daysWorked: 3, totalMinutesSlept: 30, 
                minuteMap: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]}

            ];

            var puzzleAnswer = dayFour.puzzleSolutionStrategy2(inputSummaryObjects);
            var expectedPuzzleAnswer = 4455;
                
            assert.deepEqual(puzzleAnswer, expectedPuzzleAnswer);
            
        });
    });
    describe('dayFour.solveThePuzzleDay4a - given an array of log strings', function () {
        it('it should return the answer of guard with the most minutes times the minute most represented', function() {
            var inputDataArray = [
                "[1518-11-03 00:05] Guard #10 begins shift",
                "[1518-11-01 00:00] Guard #10 begins shift",
                "[1518-11-01 00:25] wakes up",
                "[1518-11-03 00:24] falls asleep",
                "[1518-11-01 00:30] falls asleep",
                "[1518-11-05 00:55] wakes up",
                "[1518-11-01 00:55] wakes up",
                "[1518-11-02 00:40] falls asleep",
                "[1518-11-02 00:50] wakes up",
                "[1518-11-03 00:29] wakes up",
                "[1518-11-04 00:02] Guard #99 begins shift",
                "[1518-11-04 00:46] wakes up",
                "[1518-11-05 00:03] Guard #99 begins shift",
                "[1518-11-05 00:45] falls asleep",
                "[1518-11-01 23:58] Guard #99 begins shift",
                "[1518-11-01 00:05] falls asleep",
                "[1518-11-04 00:36] falls asleep"
            ];
            var puzzleAnswer = dayFour.solveThePuzzleDay4a(inputDataArray);
            var expectedPuzzleAnswer = 240;
                
            assert.equal(puzzleAnswer, expectedPuzzleAnswer);
        });
    });
    describe('dayFour.solveThePuzzleDay4b - given an array of log strings', function () {
        it('should return the answer of guard with the minute most slept times the minute most slept', function() {
            var inputDataArray = [
                "[1518-11-03 00:05] Guard #10 begins shift",
                "[1518-11-01 00:00] Guard #10 begins shift",
                "[1518-11-01 00:25] wakes up",
                "[1518-11-03 00:24] falls asleep",
                "[1518-11-01 00:30] falls asleep",
                "[1518-11-05 00:55] wakes up",
                "[1518-11-01 00:55] wakes up",
                "[1518-11-02 00:40] falls asleep",
                "[1518-11-02 00:50] wakes up",
                "[1518-11-03 00:29] wakes up",
                "[1518-11-04 00:02] Guard #99 begins shift",
                "[1518-11-04 00:46] wakes up",
                "[1518-11-05 00:03] Guard #99 begins shift",
                "[1518-11-05 00:45] falls asleep",
                "[1518-11-01 23:58] Guard #99 begins shift",
                "[1518-11-01 00:05] falls asleep",
                "[1518-11-04 00:36] falls asleep"
            ];
            var puzzleAnswer = dayFour.solveThePuzzleDay4b(inputDataArray);
            var expectedPuzzleAnswer = 4455;
                
            assert.equal(puzzleAnswer, expectedPuzzleAnswer);
        });
    });
 });
