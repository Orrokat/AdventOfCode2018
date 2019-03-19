function marbleGame(numElves, highestMarble) {
    var whoseTurn = 1;
    var currentMarbleIndex = 0;
    var ringOfMarbles = [0];  //zero is placed before the elves start taking turns
    var elfScores = [];
    var highestScore = 0;
    var initialScore = 0;
    for (var elfIndex = 0; elfIndex <= numElves; elfIndex++) { //there is no elf 0 so index 0 is just a place holder
         elfScores.push(initialScore);
    }
 
    for (i = 1; i <= highestMarble; i++) {
        if (i % 23 === 0) {
            var scoreMarbleIndex = currentMarbleIndex - 7;
            if(scoreMarbleIndex < 0){
                scoreMarbleIndex = ringOfMarbles.length + scoreMarbleIndex;
            }
            var score = i + ringOfMarbles[scoreMarbleIndex];
            elfScores[whoseTurn] += score;
            ringOfMarbles.splice(scoreMarbleIndex, 1);
            currentMarbleIndex = scoreMarbleIndex;
            
        } else {
            var insertIndex = currentMarbleIndex + 2;
            if (insertIndex > ringOfMarbles.length) {
                insertIndex = 1;
            };
            ringOfMarbles.splice(insertIndex, 0, i);
            currentMarbleIndex = insertIndex;
        };
        whoseTurn++;
        if (whoseTurn > numElves) {
            whoseTurn = 1;
        };
        
    };
    elfScores.forEach(elfScore => {
        if(elfScore > highestScore){
            highestScore = elfScore;
        }
    });
    return highestScore;
};
exports.marbleGame = marbleGame;