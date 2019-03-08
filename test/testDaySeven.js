var assert = require('assert');
var daySeven = require("../lib/daySeven.js");

describe('daySeven', function () {

    describe('daySeven.parseDependencies - given an array of strings  ', function () {
        it('should return an array of steps and dependencies', function () {
            var dependencyStrings = [
                "Step C must be finished before step A can begin.",
                "Step C must be finished before step F can begin.",
                "Step A must be finished before step B can begin.",
                "Step A must be finished before step D can begin.",
                "Step B must be finished before step E can begin.",
                "Step D must be finished before step E can begin.",
                "Step F must be finished before step E can begin."
            ];
            var expectedStepArray = [{ step: "A", dependency: "C" },
            { step: "F", dependency: "C" },
            { step: "B", dependency: "A" },
            { step: "D", dependency: "A" },
            { step: "E", dependency: "B" },
            { step: "E", dependency: "D" },
            { step: "E", dependency: "F" },

            ];


            var stepArray = daySeven.parseDependencies(dependencyStrings);

            assert.deepEqual(stepArray, expectedStepArray);

        });

    });
    describe('daySeven.sortStepArray - given an array of dependencies ', function () {
        it('should return an the array sorted by step', function () {

            var stepArray = [{ step: "A", dependency: "C" },
            { step: "F", dependency: "C" },
            { step: "B", dependency: "A" },
            { step: "D", dependency: "A" },
            { step: "E", dependency: "B" },
            { step: "E", dependency: "D" },
            { step: "E", dependency: "F" }

            ];

            var expectedStepArray = [{ step: "A", dependency: "C" },
            { step: "B", dependency: "A" },
            { step: "D", dependency: "A" },
            { step: "E", dependency: "B" },
            { step: "E", dependency: "D" },
            { step: "E", dependency: "F" },
            { step: "F", dependency: "C" }

            ];

            var sortedArray = daySeven.sortStepArray(stepArray);

            assert.deepEqual(sortedArray, expectedStepArray);

        });
    });

    describe('daySeven.createBaseStepArray - given an array of dependencies ', function () {
        it('should return an the array of step/dependencies objects sorted by step', function () {

            var stepArray = [{ step: "A", dependency: "C" },
            { step: "F", dependency: "C" },
            { step: "B", dependency: "A" },
            { step: "D", dependency: "A" },
            { step: "E", dependency: "B" },
            { step: "E", dependency: "D" },
            { step: "E", dependency: "F" }

            ];

            var expectedStepArray = [{ step: "A", dependencies: [] },
            { step: "B", dependencies: [] },
            { step: "C", dependencies: [] },
            { step: "D", dependencies: [] },
            { step: "E", dependencies: [] },
            { step: "F", dependencies: [] }

            ];

            var baseArray = daySeven.createBaseStepArray(stepArray);

            assert.deepEqual(baseArray, expectedStepArray);

        });

    });

    describe('daySeven.createStepDependenciesArray - given an array of dependencies ', function () {
        it('should return an the array of step/dependencies objects sorted by step', function () {

            var stepArray = [{ step: "A", dependency: "C" },
            { step: "F", dependency: "C" },
            { step: "B", dependency: "A" },
            { step: "D", dependency: "A" },
            { step: "E", dependency: "B" },
            { step: "E", dependency: "D" },
            { step: "E", dependency: "F" }

            ];

            var expectedStepDependenciesArray = [{ step: "A", dependencies: ['C'] },
            { step: "B", dependencies: ['A'] },
            { step: "C", dependencies: [] },
            { step: "D", dependencies: ['A'] },
            { step: "E", dependencies: ['B', 'D', 'F'] },
            { step: "F", dependencies: ['C'] }

            ];

            var baseArray = daySeven.createStepDependenciesArray(stepArray);

            assert.deepEqual(baseArray, expectedStepDependenciesArray);

        });

    });

    describe('daySeven.findStepOrder - given an array of dependency strings ', function () {
        it('should return a string of steps in the proper order based on dependencies', function () {

            var dependencyStrings = [
                "Step C must be finished before step A can begin.",
                "Step C must be finished before step F can begin.",
                "Step A must be finished before step B can begin.",
                "Step A must be finished before step D can begin.",
                "Step B must be finished before step E can begin.",
                "Step D must be finished before step E can begin.",
                "Step F must be finished before step E can begin."
            ];

            var expectedStepOrder = "CABDFE";

            var stepOrder = daySeven.findStepOrder(dependencyStrings);

            assert.deepEqual(stepOrder, expectedStepOrder);

        });
    });

    describe('daySeven.createDurationArray - given a step/dependencies array and a duration offset', function () {
        it('should return an array of matching duration objects', function () {

            var stepDependenciesArray = [{ step: "A", dependencies: ['C'] },
            { step: "B", dependencies: ['A'] },
            { step: "C", dependencies: [] },
            { step: "D", dependencies: ['A'] },
            { step: "E", dependencies: ['B', 'D', 'F'] },
            { step: "F", dependencies: ['C'] }

            ];
            var durationOffset = 0;
            var expectedDurationArray = [
                {duration: 1, started: false, worker: -1},
                {duration: 2, started: false, worker: -1},
                {duration: 3, started: false, worker: -1},
                {duration: 4, started: false, worker: -1},
                {duration: 5, started: false, worker: -1},
                {duration: 6, started: false, worker: -1},
            ];

            var durationArray = daySeven.createDurationArray(stepDependenciesArray, durationOffset);

            assert.deepEqual(durationArray, expectedDurationArray);

        });
    });
    describe('daySeven.createWorkerArray - given a number of workers', function () {
        it('should return an initialized array workers', function () {
            
            var numberWorkers = 2;
            var expectedWorkerArray = [false, false];
            var workerWorkingArray = daySeven.createWorkerArray(numberWorkers);

            assert.deepEqual(workerWorkingArray, expectedWorkerArray);

        });
    });
    describe('daySeven.findSecondsToFinish - given a number of workers, time offset and array of dependency strings', function () {
        it('should return the number of seconds required to complete the tasks', function () {
            
            var numberWorkers = 2;
            var durationOffset = 0;
            var dependencyStrings = [
                "Step C must be finished before step A can begin.",
                "Step C must be finished before step F can begin.",
                "Step A must be finished before step B can begin.",
                "Step A must be finished before step D can begin.",
                "Step B must be finished before step E can begin.",
                "Step D must be finished before step E can begin.",
                "Step F must be finished before step E can begin."
            ];
            var expectedDuration = 15;
            var durationInSeconds = daySeven.findSecondsToFinish(dependencyStrings, numberWorkers, durationOffset);

            assert.deepEqual(durationInSeconds, expectedDuration);

        });
    });
});