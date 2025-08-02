const letter = document.querySelectorAll('.Letter');
let currRow = 0;
let currCol = 0;
const ROW_LENGTH = 5;
const COL_LENGTH = 6;
let currWord = '';
let validWord = false;

WORD_URL = "https://words.dev-apis.com/word-of-the-day";
POST_URL = "https://words.dev-apis.com/validate-word";

let wordOfTheDay='';

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}


// check if the word is valid
async function validateWord(currWord) {
    return  fetch(POST_URL, {
        method: 'POST', // Specify the HTTP method as POST
        headers: {
            'Content-Type': 'application/json', // Indicate the data format
        },
        body: JSON.stringify({ // Convert the data to a JSON string for the request body
            word: currWord,
        }),
    })
       .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            return data.validWord;
        })
        .catch(error => {
            console.error('Error:', error);
        });

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
    let temp = wordOfTheDay;
    let tempCurr = currWord;
    if(currWord === wordOfTheDay){
        endGame();
    }
    else {
        for(let i = 0; i < ROW_LENGTH; i++) {
            if (tempCurr.charAt(i) === temp.charAt(i)) {
                temp = temp.slice(0, i) + " " +temp.slice(i + 1);
                tempCurr = tempCurr.slice(0, i) + " " + tempCurr.slice(i + 1);
            }
        }
        for(let i = 0; i < ROW_LENGTH; i++) {
            for(let j = 0; j < ROW_LENGTH; j++) {
                if(tempCurr.charAt(i) === temp.charAt(j)){

                    if(tempCurr.charAt(i) === " ")
                        letter[i + (currCol * ROW_LENGTH)].style.background = 'green';
                    else {
                        letter[i + (currCol * ROW_LENGTH)].style.background = 'yellow';
                        temp = temp.slice(0, j) + "@" + temp.slice(j + 1);
                    }
                    j= ROW_LENGTH;
                }
                else {
                    letter[i+(currCol*ROW_LENGTH)].style.background = 'grey';
                }
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
    for(let i = 0; i < ROW_LENGTH; i++) {
        letter[i+(currCol*ROW_LENGTH)].style.background = 'green';
    }
    currRow = ROW_LENGTH; // no more words can be entered.
    currCol = COL_LENGTH;
    alert("You Won");
}


function main() {
getWordOfTheDay()

    document.addEventListener("keydown", async function keyPress(event) {

        for (let i = 0; i < ROW_LENGTH; i++) {
            letter[i + (currCol * ROW_LENGTH)].style.background = 'white';
        }

        let key = event.key;
        if (isLetter(key)) {
            if (currRow < ROW_LENGTH) {
                letter[currRow + (currCol * ROW_LENGTH)].innerHTML = key.toUpperCase();
                currRow++;
            }
        } else if ((key === 'Enter') && (currRow === ROW_LENGTH) && (currCol < COL_LENGTH)) {
            currWord = getUserWord();
            validWord = await validateWord(currWord);
            if (validWord === true) {
                currRow = 0;
                isCorrectWord(currWord);
                currCol++;
            } else {
                for (let i = 0; i < ROW_LENGTH; i++) {
                    letter[i + (currCol * ROW_LENGTH)].style.background = 'red';
                }
            }

            if (currCol === COL_LENGTH) {
                alert("You Lost the word was " + wordOfTheDay);
            }
        } else if (key === 'Backspace') {

            if (currRow > 0) {
                currRow--;
                letter[currRow + (currCol * ROW_LENGTH)].innerHTML = '';
            }
        }
    })
}

main();