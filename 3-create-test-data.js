const csvtojsonV2=require("csvtojson/v2");
var fs = require('fs');
const csvFilePathAT='./data/hockey_ai_test_data_at.csv'
const csvFilePathCA='./data/hockey_ai_test_data_ca.csv'
const csvFilePathCH='./data/hockey_ai_test_data_ch.csv'
const csvFilePathCZ='./data/hockey_ai_test_data_cz.csv'
const csvFilePathDE='./data/hockey_ai_test_data_de.csv'
const csvFilePathFI='./data/hockey_ai_test_data_fi.csv'
const csvFilePathFR='./data/hockey_ai_test_data_fr.csv'
const csvFilePathGB='./data/hockey_ai_test_data_gb.csv'
const csvFilePathIT='./data/hockey_ai_test_data_it.csv'
const csvFilePathLV='./data/hockey_ai_test_data_lv.csv'
const csvFilePathNO='./data/hockey_ai_test_data_no.csv'
const csvFilePathRU='./data/hockey_ai_test_data_ru.csv'
const csvFilePathSE='./data/hockey_ai_test_data_se.csv'
const csvFilePathSK='./data/hockey_ai_test_data_sk.csv'
const csvFilePathUS='./data/hockey_ai_test_data_us.csv'
const csv=require('csvtojson')

var brain = require("brain.js");
let net = new brain.NeuralNetwork();

processCsv (csvFilePathCA, 'ca')
processCsv (csvFilePathCH, 'ch')
processCsv (csvFilePathCZ, 'cz')
processCsv (csvFilePathDE, 'de')
processCsv (csvFilePathFI, 'fi')
processCsv (csvFilePathRU, 'ru')
processCsv (csvFilePathSE, 'se')
processCsv (csvFilePathUS, 'us')

function processCsv (csvFilePath, country) {
   
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{

            var trainingData = new Array()
            var i;
            for (i = 0; i < jsonObj.length; i++) { 

                trainingData.push({
                        age: convert(jsonObj[i].Age),
                        pos: position(jsonObj[i].Pos),
                        gp: convert(jsonObj[i].GP),
                        g: convert(jsonObj[i].G),
                        a: convert(jsonObj[i].A),
                        p: convert(jsonObj[i].P),
                        pim: convert(jsonObj[i].PIM),
                        pm: convert3(jsonObj[i].PM),
                        ppg: convert(jsonObj[i].PPG),
                        shg: convert(jsonObj[i].SHG),
                        gwg: convert(jsonObj[i].GWG),
                        g_gp: convert2(jsonObj[i].G_GP),
                        a_gp: convert2(jsonObj[i].A_GP),
                        p_gp: convert2(jsonObj[i].P_GP),
                        p_gp: convert2(jsonObj[i].P_GP)
                    }
                )
                console.log(trainingData)
                fs.writeFile('./data/train-data-test-' + country + '.txt', JSON.stringify(trainingData), (err) => {
                
                    if (err) {
                        console.log(err)
                    }

                })
            
            }
        })

}

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