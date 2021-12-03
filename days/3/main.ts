import * as path from 'path';
import { readFileSync } from 'fs';

const inputData: Array<string> = readFileSync(
                                    path.join(__dirname, 'input.txt'), 'utf8'
                                 ).split("\n");

let parsedData: Array<Array<number>> = [];

Object.entries(inputData).forEach(
    function ([index, line]) {
        let lineArray: Array<string> = line.split('');
        let lineArrayNum: Array<number> = lineArray.map(function (x) {
            return parseInt(x, 10);
        });
        parsedData.push(lineArrayNum);
    }
);

// PART 1

let highCountResult: Array<number> = [];
let lowCountResult: Array<number> = [];

for (let i = 0; i < parsedData[0].length ; i++) {
    let zeroCount = 0;
    let oneCount = 0;
    
    for (let j = 0; j < parsedData.length ; j++) {
        switch(parsedData[j][i]) {
            case 0:
                zeroCount++;
                break;
            case 1:
                oneCount++;
                break;
            default:
                console.log(`Something has gone wrong on i=${i} j=${j}`)
                break;
        }
    }
    
    if (zeroCount > oneCount) {
        highCountResult.push(0)
        lowCountResult.push(1)
    } else if (zeroCount < oneCount) {
        highCountResult.push(1)
        lowCountResult.push(0)
    } else {
        console.log(`Something else has gone wrong on i=${i}`)
    }
}

let highCountBinaryString: string = highCountResult.join("");
let lowCountBinaryString: string = lowCountResult.join("");

let gammaRate: number = parseInt(highCountBinaryString, 2);
let epsilonRate: number = parseInt(lowCountBinaryString, 2);

let totalPart1: number = gammaRate * epsilonRate;

console.log(`highCountBinaryString: ${highCountBinaryString}
gammaRate: ${gammaRate}
lowCountBinaryString: ${lowCountBinaryString}
epsilonRate: ${epsilonRate}
totalPart1: ${totalPart1}

`)


// PART 2

let oxygenArray: Array<Array<number>> = parsedData;
let oxygenIndex: number = 0;
while(oxygenArray.length != 1) {
    let zeroCount = 0;
    let oneCount = 0;
    let moreCommonDigit: number = -1; // If this isn't assigned a value, runtime throws `Variable 'moreCommonDigit' is used before being assigned.`
    
    for (let j = 0; j < oxygenArray.length ; j++) {
        switch(oxygenArray[j][oxygenIndex]) {
            case 0:
                zeroCount++;
                break;
            case 1:
                oneCount++;
                break;
            default:
                console.log(`Something has gone wrong on oxygenIndex=${oxygenIndex} j=${j}`);
                break;
        }
        
        if (zeroCount > (oxygenArray.length / 2)) {
            moreCommonDigit = 0;
            break;
        } else if (oneCount >= (oxygenArray.length / 2)) {
            moreCommonDigit = 1;
            break;
        }
    }

    let tmpOxygenArray: Array<Array<number>> = [];
    for (let j = 0; j < oxygenArray.length ; j++) {
        if (oxygenArray[j][oxygenIndex] == moreCommonDigit) {
            tmpOxygenArray.push(oxygenArray[j])
        }
    }

    oxygenArray = tmpOxygenArray;
    oxygenIndex++;
}

let co2Array: Array<Array<number>> = parsedData;
let co2Index: number = 0;
while(co2Array.length != 1) {
    let zeroCount = 0;
    let oneCount = 0;
    let lessCommonDigit: number = -1;
    
    for (let j = 0; j < co2Array.length ; j++) {
        switch(co2Array[j][co2Index]) {
            case 0:
                zeroCount++;
                break;
            case 1:
                oneCount++;
                break;
            default:
                console.log(`Something has gone wrong on co2Index=${co2Index} j=${j}`);
                break;
        }

        if (zeroCount > (co2Array.length / 2)) {
            lessCommonDigit = 1;
            break;
        } else if (oneCount >= (co2Array.length / 2)) {
            lessCommonDigit = 0;
            break;
        }
    }

    let tmpCo2Array: Array<Array<number>> = [];
    for (let j = 0; j < co2Array.length ; j++) {
        if (co2Array[j][co2Index] == lessCommonDigit) {
            tmpCo2Array.push(co2Array[j])
        }
    }

    co2Array = tmpCo2Array;
    co2Index++;
}

let oxygenFinalStringBinary: string = oxygenArray[0].join("")
let oxygenGeneratorRating: number = parseInt(oxygenFinalStringBinary, 2);

let co2FinalStringBinary: string = co2Array[0].join("")
let co2ScrubberRating: number = parseInt(co2FinalStringBinary, 2);

let totalPart2: number = oxygenGeneratorRating * co2ScrubberRating

console.log(`oxygenFinalStringBinary: ${oxygenFinalStringBinary}
oxygenGeneratorRating: ${oxygenGeneratorRating}
co2FinalStringBinary: ${co2FinalStringBinary}
co2ScrubberRating: ${co2ScrubberRating}
totalPart2: ${totalPart2}`)
