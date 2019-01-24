
var dayOne = require("./lib/dayOne.js");
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

app.listen(port, () => console.log(`Time Traveling Device listening on port ${port}!`))

