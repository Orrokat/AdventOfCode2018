
var dayOne = require("./lib/dayOne.js");
var dayTwo = require("./lib/dayTwo.js");
var dayThree = require("./lib/dayThree.js");
var dayFour = require("./lib/dayFour.js");
var fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', function (req, res) {
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

app.listen(port, () => console.log(`Time Traveling Device listening on port ${port}!`))

