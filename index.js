
var dayOne = require("./lib/dayOne.js");
var dayTwo = require("./lib/dayTwo.js");
var dayThree = require("./lib/dayThree.js");
var dayFour = require("./lib/dayFour.js");
var dayFive = require("./lib/dayFive.js");
var daySix = require("./lib/daySix.js");
var daySeven = require("./lib/daySeven.js");
var fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const numberOfDays = 7;

app.use(express.static('.'));

app.get('/day1a', function (req, res) {
    fs.readFile("files\\day1a.csv", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${"DAY ONE FIRST PART - Total Frequency = " + dayOne.adjust(data.split(/\r\n|\n|\r/gm))}`)

    });
});

app.get('/day1b', function (req, res) {
    fs.readFile("files\\day1a.csv", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${"DAY ONE SECOND PART - First Duplicate Found = " + 
        dayOne.cycleFrequencyChanges(data.split(/\r\n|\n|\r/gm), 0, [], 0)}`)
 
    });
});

app.get('/day2a', function (req, res) {
    fs.readFile("files\\day2.txt", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${"DAY TWO FIRST PART - Checksum = " + 
                 dayTwo.getCheckSum(data.split(/\r\n|\n|\r/gm))}`)
 
    });
});

app.get('/day2b', function (req, res) {
    fs.readFile("files\\day2.txt", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${"DAY TWO SECOND PART - Matching string = " + 
                 dayTwo.getCloseMatchIDString(data.split(/\r\n|\n|\r/gm))}`)
 
    });
});

app.get('/day3a', function (req, res) {
    fs.readFile("files\\day3.txt", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${"DAY THREE FIRST PART - Number of contested square inches = " + 
                 dayThree.findContestedInches(data.split(/\r\n|\n|\r/gm), 2000, 2000)}`)
 
    });
});

app.get('/day3b', function (req, res) {
    fs.readFile("files\\day3.txt", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${"DAY THREE SECOND PART - Claim ID with no contention = " + 
                 dayThree.findUncontestedClaim(data.split(/\r\n|\n|\r/gm), 2000, 2000)}`)
 
    });
});

app.get('/day4a', function (req, res) {
    fs.readFile("files\\day4.txt", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${"DAY FOUR FIRST PART - Guard who slept the most times the minute he slept the most = " + 
                 dayFour.solveThePuzzleDay4a(data.split(/\r\n|\n|\r/gm))}`)
 
    });
});

app.get('/day4b', function (req, res) {
    fs.readFile("files\\day4.txt", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${"DAY FOUR SECOND PART - Guard who slept the same minute the most times multiplied by the minute he slept the most = " + 
                 dayFour.solveThePuzzleDay4b(data.split(/\r\n|\n|\r/gm))}`)
 
    });
});

app.get('/day5a', function (req, res) {
    fs.readFile("files\\day5.txt", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${"DAY FIVE FIRST PART - Number of units left in collapsed polymer string = " + 
                 dayFive.collapsePolymer(data)}`)
 
    });
});

app.get('/day5b', function (req, res) {
    fs.readFile("files\\day5.txt", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${"DAY FIVE SECOND PART - Number of units left in optimal collapsed polymer string = " + 
                 dayFive.findTheBestCollapse(data)}`)
 
    });
});

app.get('/day6a', function (req, res) {
    fs.readFile("files\\day6.txt", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${"DAY SIX FIRST PART - Number of elements closest to not inifinite coordinates = " + 
                 daySix.mostElements(data.split(/\r\n|\n|\r/gm))}`)
 
    });
});

app.get('/day6b', function (req, res) {
    fs.readFile("files\\day6.txt", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${"DAY SIX SECOND PART - Number of elements with a sum of Manhatten Distances less than 10,000 = " + 
                 daySix.findCloseElements(data.split(/\r\n|\n|\r/gm), 10000)}`)
 
    });
});

app.get('/day7a', function (req, res) {
    fs.readFile("files\\day7.txt", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${"DAY SEVEN FIRST PART - Order instructions should be carried out = " + 
                 daySeven.findStepOrder(data.split(/\r\n|\n|\r/gm))}`)
 
    });
});

app.get('/day7b', function (req, res) {
    fs.readFile("files\\day7.txt", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${"DAY SEVEN SECOND PART - Seconds to complete all tasks with 5 workers = " + 
                 daySeven.findSecondsToFinish(data.split(/\r\n|\n|\r/gm), 5, 60)}`)
 
    });
});

app.get('/days', function (req, res){
        res.send(getDaysArray(numberOfDays));
});

app.listen(port, () => console.log(`Time Traveling Device listening on port ${port}!`))

function getDaysArray(numberOfDays) {
    var daysArray = [];
    for (var x = 0; x < numberOfDays; x++) {
        var dayNumber = x + 1;
        daysArray.push("day" + dayNumber + "a");
        daysArray.push("day" + dayNumber + "b");
    }
    return daysArray;
}

