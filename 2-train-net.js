var fs = require('fs');
var brain = require("brain.js");
let net = new brain.NeuralNetwork();

var trainingData = JSON.parse(fs.readFileSync('./data/train-data.txt', 'utf8'));
net.train(trainingData,{   
            iterations: 20000,
            errorThresh: 0.005,
            log: true,
            logPeriod: 10
})

var jsonNet = net.toJSON();
JSON.stringify(jsonNet)
trainedNet = net.toFunction();

fs.writeFile('network.txt', JSON.stringify(jsonNet), (err) => {
         
         if (err) {
             console.log(err)
         }
         
         console.log("net saved to a local file")
})

var testData = { age: 0.04,
    pos: 0,
    gp: 0.1,
    g: 1,
    a: 0.25,
    p: 0.2,
    pim: 0.083,
    pm: 0.5,
    ppg: 0,
    shg: 0,
    gwg: 1,
    g_gp: 0,
    a_gp: 0,
    p_gp: 0 }

console.log(net.run(testData))