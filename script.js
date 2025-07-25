const letter = document.querySelectorAll('.Letter');
let currRow = 0;
let currCol = 0;
const ROW_LENGTH = 5;
const COL_LENGTH = 6;

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}
async function main() {


    document.addEventListener("keydown", function keyPress(event) {
        const test = event.key.toUpperCase();
        if(isLetter(test)) {
            letter[currRow].innerHTML = test;

            if(currRow < ROW_LENGTH-1)
            currRow++;
        }
        console.log(event.key);

    })
}

main();