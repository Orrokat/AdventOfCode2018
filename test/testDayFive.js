var assert = require('assert');
var dayFive = require("../lib/dayFive.js");



describe('dayFive', function () {

    describe('dayFive.collapsePolymer - given a string representing a polymer', function () {
        it('should remove pairs until no more can be removed and return the length of the string', function (){
            var inputPolymerString = "dabAcCaCBAcCcaDA";
            var expectedlength = 10;
            var collapsedPolymerStringLength = dayFive.collapsePolymer(inputPolymerString);

            assert.equal(collapsedPolymerStringLength, expectedlength);
                              
        });

    });

    describe('dayFive.findTheBestCollapse - given a string representing a polymer', function () {
        it('should return the length of the optimum polymer collapse', function (){
            var inputPolymerString = "dabAcCaCBAcCcaDA";
            var expectedlength = 4;
            var bestPolymerStringLength = dayFive.findTheBestCollapse(inputPolymerString);

            assert.equal(bestPolymerStringLength, expectedlength);
                              
        });

    });
});