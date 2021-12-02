import * as path from 'path';
import { readFileSync } from 'fs';

const inputData: Array<string> = readFileSync(
                                    path.join(__dirname, 'input.txt'), 'utf8'
                                 ).split("\n");
const inputDataNum: Array<number> = inputData.map(function (x) {
    return parseInt(x, 10);
});

let countDown: number = 0;
let countSame: number = 0;
let countUp: number = 0;

// skipping the first value w/ i=1 vs i=0
for (let i = 1; i < inputDataNum.length ; i++) {
    let diff = inputDataNum[i] - inputDataNum[i - 1];
    switch(true) {
        case (diff < 0):
            countDown++;
            break;
        case (diff == 0):
            countSame++;
            break;
        case (diff > 0):
            countUp++;
            break;
        default:
            console.log(`NO CASE MATCH COMPARING LINES: ${i-1} & ${i}`)
    }
}

console.log(`Moved down: ${countDown}
No movement: ${countSame}
Moved up: ${countUp}
`)

//// We want to check values of index neighbors, this seems like overkill as opposed to referencing the index numbers directly
// Object.entries(inputDataNum).forEach(
//     function ([key, val]) {
//         console.log(key);
//         console.log(val);
//     }
// );
