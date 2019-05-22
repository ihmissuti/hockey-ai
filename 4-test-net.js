var fs = require('fs');
var brain = require("brain.js");
let net = new brain.NeuralNetwork();
var netData = JSON.parse(fs.readFileSync('network.txt', 'utf8'));
var testDataCA = JSON.parse(fs.readFileSync('./data/train-data-test-ca.txt', 'utf8'));
var testDataCH = JSON.parse(fs.readFileSync('./data/train-data-test-ch.txt', 'utf8'));
var testDataCZ = JSON.parse(fs.readFileSync('./data/train-data-test-cz.txt', 'utf8'));
var testDataDE = JSON.parse(fs.readFileSync('./data/train-data-test-de.txt', 'utf8'));
var testDataFI = JSON.parse(fs.readFileSync('./data/train-data-test-fi.txt', 'utf8'));
var testDataNO = JSON.parse(fs.readFileSync('./data/train-data-test-cz.txt', 'utf8'));
var testDataRU = JSON.parse(fs.readFileSync('./data/train-data-test-ru.txt', 'utf8'));
var testDataSE = JSON.parse(fs.readFileSync('./data/train-data-test-se.txt', 'utf8'));
var testDataUS = JSON.parse(fs.readFileSync('./data/train-data-test-us.txt', 'utf8'));
const average = require('array-average');
const sortObjectsArray = require('sort-objects-array');
net.fromJSON(netData);
var i;


async function getResult(testData, country) {

    var gold = []
    var silver = []
    var bronze = []
    var no_medal = []
    var i;
    for (i = 0; i < testData.length; i++) { 

        var result = await net.run(testData[i])
        gold.push(result.gold)
        silver.push(result.silver)
        bronze.push(result.bronze)
        no_medal.push(result.no_medal)
    }

    console.log('machine learning done!');
    var gold_p = average(gold);
    var silver_p = average(silver);
    var bronze_p = average(bronze);
    var no_medal_p = average(no_medal);

    var answ = {
        country: country,
        gold: gold_p,
        silver: silver_p,
        bronze: bronze_p,
        no_medal: no_medal_p
    }
    return answ
    
  }

  var promise2 =  Promise.resolve(getResult(testDataCA , 'Canada'));
  var promise3 =  Promise.resolve(getResult(testDataCH , 'Switzerland'));
  var promise4 =  Promise.resolve(getResult(testDataCZ , 'Czech'));
  var promise5 =  Promise.resolve(getResult(testDataDE, 'Germany'));
  var promise6 =  Promise.resolve(getResult(testDataFI, 'Finland'));
  var promise12 =  Promise.resolve(getResult(testDataRU, 'Russia'));
  var promise13 =  Promise.resolve(getResult(testDataSE, 'Swergie'));
  var promise15 =  Promise.resolve(getResult(testDataUS, 'USA'));

  Promise.all([
    promise2, 
    promise3, 
    promise4, 
    promise5, 
    promise6, 
    promise12, 
    promise13, 
    promise15
  ]).then(function(values) {

    var gold = sortObjectsArray(values, 'gold', 'desc')
    // var silver = sortObjectsArray(values, 'silver', 'desc')
    // var bronze = sortObjectsArray(values, 'bronze', 'desc')
    // var no_medal = sortObjectsArray(values, 'no_medal', 'desc')

    console.log("Ranking:")
    for (i = 0; i < gold.length; i++) {

      console.log(i + ": " + gold[i].country)
     

    }

});