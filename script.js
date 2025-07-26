const letter = document.querySelectorAll('.Letter');
let currRow = 0;
let currCol = 0;
const ROW_LENGTH = 5;
const COL_LENGTH = 6;
let currWord = '';

WORD_URL = "https://words.dev-apis.com/word-of-the-day";
POST_URL = "https://words.dev-apis.com/validate-word";

let wordOfTheDay='SPACE';

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}


// check if the word is valid
function validWord(currWord) {
    return true;
}

// gets the current word that user has typed so far
function getUserWord() {
    let result = '';

    for(let i = 0; i < ROW_LENGTH; i++) {
            result+= letter[i+(currCol*ROW_LENGTH)].innerHTML.toUpperCase();
    }
    return result;
}


function isCorrectWord(currWord) {
    let result = false;
    console.log(currWord);
    console.log(wordOfTheDay);
    if(currWord === wordOfTheDay){
        for(let i = 0; i < ROW_LENGTH; i++) {
            letter[i+(currCol*ROW_LENGTH)].style.background = 'green';
        }
        endGame();
    }
    else {
        for(let i = 0; i < ROW_LENGTH; i++) {
            for(let j = 0; j < ROW_LENGTH; j++) {
                if(letter[i+(currCol*ROW_LENGTH)].innerHTML === wordOfTheDay.charAt(j)){
                    letter[i+(currCol*ROW_LENGTH)].style.background = 'yellow';
                }
                // else {
                //     letter[i+(currCol*ROW_LENGTH)].style.background = 'grey';
                //
                // }
            }
        }

    }
}


function getWordOfTheDay() {

    const promise = fetch(WORD_URL);
    promise.then(function (resp) {
        return resp.text();
    }) .then(function (result) {
            const objWord = JSON.parse(result);
            wordOfTheDay = objWord.word.toUpperCase();
    })

}


function endGame() {
    //pop up saying you win
    currRow = ROW_LENGTH; // no more words can be entered..
    currCol = COL_LENGTH;
    alert("You Won");

}


async function main() {
//getWordOfTheDay()


    document.addEventListener("keydown", function keyPress(event) {
        let key = event.key;
        if(isLetter(key)) {

            if(currRow < ROW_LENGTH){
                letter[currRow+(currCol*ROW_LENGTH)].innerHTML = key.toUpperCase();
                currRow++;
            }
        }
        else if((key === 'Enter') && (currRow === ROW_LENGTH) && (currCol<COL_LENGTH-1)){
                currWord = getUserWord();
                if(validWord(currWord)){
                    currRow = 0;
                    isCorrectWord(currWord);
                    currCol++;
                }

            else{
                //you lost word was yeet
            }
        }

        else if(key === 'Backspace'){

            if(currRow > 0) {
                currRow--;
                letter[currRow + (currCol * ROW_LENGTH)].innerHTML = '';
            }


        }
        console.log(event.key);

    })
}

main();