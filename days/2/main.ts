import * as path from 'path';
import { readFileSync } from 'fs';

const inputData: Array<string> = readFileSync(
                                    path.join(__dirname, 'input.txt'), 'utf8'
                                 ).split("\n");

// PART 1

let horPos: number = 0;
let depth: number = 0;

Object.entries(inputData).forEach(
    function ([index, val]) {
        let direction: string = val.split(" ")[0];
        let power: number = parseInt(val.split(" ")[1], 10);
        switch(true) {
            case direction == "forward":
                horPos += power;
                break;
            case direction == "down":
                depth += power;
                break;
            case direction == "up":
                depth -= power;
                break;
            default:
                console.log(`NO DIRECTION MATCH ON INDEX ${index}`)
        }
    }
);

console.log(`PART 1
Horizontal Position: ${horPos}
Depth: ${depth}
Answer: ${depth * horPos}
`)

// PART 2

horPos = 0;
depth = 0;
let aim: number = 0;

Object.entries(inputData).forEach(
    function ([index, val]) {
        let direction: string = val.split(" ")[0];
        let power: number = parseInt(val.split(" ")[1], 10);
        switch(true) {
            case direction == "forward":
                horPos += power;
                depth += (power * aim);
                break;
            case direction == "down":
                aim += power;
                break;
            case direction == "up":
                aim -= power;
                break;
            default:
                console.log(`NO DIRECTION MATCH ON INDEX ${index}`)
        }
    }
);

console.log(`PART 2
Horizontal Position: ${horPos}
Depth: ${depth}
Answer: ${depth * horPos}
`)

