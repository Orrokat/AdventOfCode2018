var fs = require('fs');
function arrayFromFile(fileName, callback){
    var newArray = []
    fs.readFile(fileName, "utf8", function (err, data){
        if(err) throw err;        
        callback(data.split(/\r\n|\n|\r/gm)); 
    });
     

}
function arraySort(dataArray){
    
    return dataArray.sort();    

}
exports.arrayFromFile = arrayFromFile;
exports.arraySort = arraySort;