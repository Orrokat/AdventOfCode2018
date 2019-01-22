
var dayOne = require("./lib/dayOne.js");
var fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
//app.use(express.static('files'));


app.get('/', function (req, res) {
    fs.readFile("day1a.csv", "utf8", function(err, data){
        if(err) throw err;
        res.send(`${dayOne.adjust(data.split(/\r\n|\n|\r/gm))}`)
    });
});

app.listen(port, () => console.log(`Time Traveling Device listening on port ${port}!`))

