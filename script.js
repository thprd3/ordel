const WORDS = [ // vurder tre arrays, difficulties
    'fluor','måned','frosk','kræsj','kaldt','lompe','pølse','purke',
    'laser','lampe','bukse','korps','thale','tramp','gryte','følge',
    'krise','rumpe','truse','rynke','lunte','måned','hjort','plast',
    'løfte','altså','poker'
]

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)
let output = document.getElementById("output");
let green = '#aaebb8'; let yellow = '#f5f3a3'; let grey = '#e7e7e7';

function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-å]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    animateCSS(box, "pulse")
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess () {
    // determines what row to check, depending on how many guesses are left. 
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''

    // adds the individual letters to guessString, forming the complete word guessed
    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        alert("Du må gjette fem bokstaver.")
        return
    }

/*     if (!WORDS.includes(guessString)) {
        alert("Word not in list!")
        return
    } */

    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        if (currentGuess[i] === rightGuessString[i]){
            letterColor = green;
        }

        else if (rightGuessString.includes(currentGuess[i])) {
            letterColor = yellow;
        }
        else {
            letterColor = grey;
        }

        let delay = 250 * i

        setTimeout(function(){
            animateCSS(box, 'flipInX')
            box.style.backgroundColor = letterColor;
        }, delay)
        shadeKeyBoard(currentGuess[i], letterColor);
    }

    if (guessString === rightGuessString) {
        setTimeout(gameOver()),1250;
    
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            rightGuessString = rightGuessString.toUpperCase();
            var el = document.createElement("div");
            el.innerHTML = "<h2>Game over!"
            + "<br>Ordet var: <em>"+rightGuessString+"</em></h2>";
            document.body.appendChild(el);
        }
    }
}
function gameOver(){
    var el = document.createElement("div");
    el.innerHTML = "<h2>BRA JOBBA!!</h2>";
    document.body.appendChild(el);
}
function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent == letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor == green) {
                return
            } 

            if (oldColor == yellow && color !== green) {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

initBoard()