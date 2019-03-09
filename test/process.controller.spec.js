var assert = require('assert');
var processController =  require('../controllers/processController');
var testCase1 = {
    shopsFishTypesInfo : [[1,'1'],[1,'2'],[1,'3'],[1,'4'],[1,'5']],
    shopsConnInfo : [[1,2,10],[1,3,10],[2,4,10],[3,5,10],[4,5,10]],
    k: 5,
}
var testCase2 = {
    shopsFishTypesInfo : [[1,'1'],[2,'1 2'],[2,'2 3'],[1,'2'],[1,'2']],
    shopsConnInfo : [[1,2,10],[1,4,1],[1,3,15],[3,5,5],[2,3,10]],
    k: 3,
}
describe('ProcessController', function () {

  describe('isCorrectlyCalculateMinTime', async function(){

    it('should return 30 with testCase1 variable', async function(){
      var isValid = await processController.bestTravelTimeCalc(testCase1.shopsFishTypesInfo,testCase1.shopsConnInfo,testCase1.k)
      assert.equal(isValid.minTime, 30);
    });

    it('should return 20 with testCase2 variable', async function(){
        var isValid = await processController.bestTravelTimeCalc(testCase2.shopsFishTypesInfo,testCase2.shopsConnInfo,testCase2.k)
        assert.equal(isValid.minTime, 20);
      });

  });

});