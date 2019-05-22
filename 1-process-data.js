const csvtojsonV2=require("csvtojson/v2");
var fs = require('fs');
const csvFilePath='./data/pelaajadatat_since_99.csv'
const csv=require('csvtojson')

var brain = require("brain.js");
let net = new brain.NeuralNetwork();

var trainingData = []

function escape (str) {
    return str.replace(/Ikä/gi, 'Age').replace(/\+\/\-/gi, 'PM').replace(/M\/O/gi, 'MO').replace(/S\/O/gi, 'SO').replace(/P\/O/gi, 'PO')
};

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{

    var escJson = JSON.parse(escape(JSON.stringify(jsonObj)))

    var i;
    for (i = 0; i < escJson.length; i++) { 

        trainingData.push({
            input: {
                age: convert(escJson[i].Age),
                pos: position(escJson[i].PP),
                gp: convert(escJson[i].O),
                g: convert(escJson[i].M),
                a: convert(escJson[i].S),
                p: convert(escJson[i].P),
                pim: convert(escJson[i].RM),
                pm: convert3(escJson[i].PM),
                ppg: convert(escJson[i].YVM),
                shg: convert(escJson[i].AVM),
                gwg: convert(escJson[i].VM),
                g_gp: convert2(escJson[i].MO),
                a_gp: convert2(escJson[i].SO),
                p_gp: convert2(escJson[i].PO),
            },
            output: {
                gold: wins(escJson[i].Gold),
                silver: wins(escJson[i].Silver),
                bronze: wins(escJson[i].Bronze),
                no_medal: wins(escJson[i].No_medal)
            }
        })
        console.log(trainingData)
        fs.writeFile('./data/train-data.txt', JSON.stringify(trainingData), (err) => {
         
            if (err) {
                console.log(err)
            }
            
            console.log("net saved to a local file")
        })
      
    }
})

function convert (input) {

    if (input == '0' || input == undefined || input == null || input == '') {
        return 0
    } else {
        var num = parseFloat((1/parseInt(input, 10)).toFixed(3))
        return num
    }
}

function convert2 (input) {

    if (input == '0' || input == undefined || input == null || input == '' || input == 0) {
        return 0
    }
    else if (input > 1) {
        return 1
    } else {
        return parseFloat(input)
    }
}

function convert3 (input) {

    if (input == '0' || input == undefined || input == null || input == '' || input == 0) {
        return 0
    } else if (input < 0) {
        return 0.5
    } else {
        return 1
    }
}

function position (input) {
    console.log(input)
    if (input == 'H') {
        return 1
    } else if (input == 'P') {
        return 0.5
    }
    else {
        return 0
    }
}

function wins (input) {
    if (input == '1') {
        return 1
    } else {
        return 0
    }
}

async function processArray(obj) {
    for (var i = 0; i < obj.length; i++) {
      await process(obj[i]);
    }
    console.log('Done!');
  }