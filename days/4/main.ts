import * as path from 'path';
import { readFileSync } from 'fs';

const inputData: Array<string> = readFileSync(
                                    // path.join(__dirname, 'test.txt'), 'utf8'
                                    path.join(__dirname, 'input.txt'), 'utf8'
                                 ).split("\n");

// Separate the guesses from the boards
const guessList: Array<number> = inputData[0].split(',').map(function (x) {
    return parseInt(x, 10);
});

// Clone inputData to a mutable variable and remove the guesses + empty line
let boardInputData: Array<string> = inputData;
boardInputData.splice(0 , 2)

let boardList: Array<Array<Array<number>>> = [];

let tmpBoardData: Array<Array<number>> = [];
for (let i = 0; i < boardInputData.length ; i++) {
    if (boardInputData[i] == '') { // cheated and added a newline to the end of the input.txt file
        boardList.push(tmpBoardData)
        tmpBoardData = []
    } else {
        tmpBoardData.push(
            boardInputData[i].split(/(\s+)/)
            .filter( function(e) { return e.trim().length > 0; } )
            .map(function (x) { return parseInt(x, 10); } )
        )
    }
}

function getIndexes() {
    for (let i = 0; i < guessList.length ; i++) { // loops over the guesses
        let currentGuessList = guessList.slice(0, i + 1) // slice() does NOT include the end element https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
        // console.log(currentGuessList)
        for (let j = 0; j < boardList.length ; j++) { // loops over the list of boards
            for (let k = 0; k < boardList[0].length ; k++) { // loops over the rows in a board
                if (
                    currentGuessList.includes(boardList[j][k][0])
                    && currentGuessList.includes(boardList[j][k][1])
                    && currentGuessList.includes(boardList[j][k][2])
                    && currentGuessList.includes(boardList[j][k][3])
                    && currentGuessList.includes(boardList[j][k][4])
                ) {
                    // console.log(`found row match on board index: ${j}`)
                    return [i, j]
                }
                for (let l = 0; l < boardList[0][0].length ; l++) { // loops over the columns in a board
                    if (
                        currentGuessList.includes(boardList[j][0][l])
                        && currentGuessList.includes(boardList[j][1][l])
                        && currentGuessList.includes(boardList[j][2][l])
                        && currentGuessList.includes(boardList[j][3][l])
                        && currentGuessList.includes(boardList[j][4][l])
                    ) {
                        // console.log(`found column match on board index: ${j}`)
                        return [i, j]
                    }                
                }
            }
        }
    }
}

getIndexes()!; //https://stackoverflow.com/questions/54496398/typescript-type-string-undefined-is-not-assignable-to-type-string
let [guessIndex, boardIndex] = getIndexes()!; //https://stackoverflow.com/questions/54496398/typescript-type-string-undefined-is-not-assignable-to-type-string

let answerGuessList: Array<number> = guessList.slice(0, guessIndex + 1)
let answerBoard: Array<Array<number>> = boardList[boardIndex]

let unmatchedSum: number = 0;
for (let i = 0; i < answerBoard.length ; i++) {
    for (let j = 0; j < answerBoard[0].length ; j++) {
        if (!answerGuessList.includes(answerBoard[i][j])) {
            unmatchedSum += answerBoard[i][j]
        }
    }
}

console.log(`
Sum of unmatched numbers: ${unmatchedSum}
Last guess number that was called: ${guessList[guessIndex]}
Product of unmatchedSum and last guess: ${unmatchedSum * guessList[guessIndex]}`)



// PART 2

// We're going to be modifying the board list array, so we want to preserve the original copy with a clone here
let tmpBoardList = JSON.parse(JSON.stringify(boardList));

let foundBoardCount: number = 0;
function getLastIndexes() {
    for (let i = 0; i < guessList.length ; i++) { // loops over the guesses
        let currentGuessList = guessList.slice(0, i + 1) // slice() does NOT include the end element https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
        for (let j = 0; j < tmpBoardList.length ; j++) { // loops over the list of boards
            for (let k = 0; k < 5 ; k++) { // loops over the rows in a board
                if (tmpBoardList[j].length) { // check to make sure the board hasn't been eliminated already
                    if (
                        currentGuessList.includes(tmpBoardList[j][k][0])
                        && currentGuessList.includes(tmpBoardList[j][k][1])
                        && currentGuessList.includes(tmpBoardList[j][k][2])
                        && currentGuessList.includes(tmpBoardList[j][k][3])
                        && currentGuessList.includes(tmpBoardList[j][k][4])
                    ) {
                        // console.log(`found row match on board index: ${j}`)
                        tmpBoardList.splice(j, 1, [])
                        foundBoardCount++
                    }
                }
                for (let l = 0; l < 5 ; l++) { // loops over the columns in a board
                    if (tmpBoardList[j].length) { // check to make sure the board hasn't been eliminated already
                        if (
                            currentGuessList.includes(tmpBoardList[j][0][l])
                            && currentGuessList.includes(tmpBoardList[j][1][l])
                            && currentGuessList.includes(tmpBoardList[j][2][l])
                            && currentGuessList.includes(tmpBoardList[j][3][l])
                            && currentGuessList.includes(tmpBoardList[j][4][l])
                        ) {
                            // console.log(`found column match on board index: ${j}`)
                            tmpBoardList.splice(j, 1, [])
                            foundBoardCount++
                        }
                    }
                }
            }
            // On the last board, the above code will make this true and we will return the index here
            if (tmpBoardList.length == foundBoardCount) {
                return [i, j]
            }
        }
    }
}

[guessIndex, boardIndex] = getLastIndexes()!; //https://stackoverflow.com/questions/54496398/typescript-type-string-undefined-is-not-assignable-to-type-string

answerGuessList = guessList.slice(0, guessIndex + 1)
answerBoard = boardList[boardIndex]

unmatchedSum = 0;
for (let i = 0; i < answerBoard.length ; i++) {
    for (let j = 0; j < answerBoard[0].length ; j++) {
        if (!answerGuessList.includes(answerBoard[i][j])) {
            unmatchedSum += answerBoard[i][j]
        }
    }
}

console.log(`
Sum of unmatched numbers: ${unmatchedSum}
Last guess number that was called: ${guessList[guessIndex]}
Product of unmatchedSum and last guess: ${unmatchedSum * guessList[guessIndex]}`)
