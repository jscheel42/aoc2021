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

let total: number = gammaRate * epsilonRate;

console.log(`highCountBinaryString: ${highCountBinaryString}
gammaRate: ${gammaRate}
lowCountBinaryString: ${lowCountBinaryString}
epsilonRate: ${epsilonRate}
total: ${total}`)