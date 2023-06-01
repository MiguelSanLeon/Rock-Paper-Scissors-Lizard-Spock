// Wait for the DOM to finish loading before running the game
// Get DOM elements
const startButton = document.getElementById('startButton');
const playerButtons = document.getElementsByClassName('playerButtons');
const computerCard = document.getElementById('computerCard');
const playerCard = document.getElementById('playerCard');
const resultText = document.getElementById('resultText');
const computerWinsText = document.getElementById('computerWinsText');
const playerWinsText = document.getElementById('playerWinsText');

// Game variables
let computerScore = 0;
let playerScore = 0;

// Game functions 
/** Function start the game 
 * reset the score table
 * clean the result text 
 * reset computer card and player card with text and no image
*/
function startGame() {
    computerScore = 0;
    playerScore = 0;
    updateScoreText();
    playerButtons.forEach(button => button.disable = false);
    resultText.textContent = "";
    computerCard.innerHTML = "Computer Choice";
    playerCard.innerHTML = "Player Choice";
}
/** Function to play a round in the game */

function playRound() {
    const playerChoice = this.textContent.toLowerCase();
    const computerChoice = getRandomChoice();
    const result = determineWinner(playerChoice, computerChoice);

    displayCard(playerChoice, computerChoice);
    resultText.textContent = result;

    if (result.includes("win")) {
        playerScore++;
    } else if (result.includes("lose")) {
        computerScore++;
    }

    updateScoreText();

    if (playerScore === 5 || computerScore === 5) {
        playerButtons.forEach(button => button.disable = true);
        resultText.textContent += "\n\nGame Over!";
    }
}
/** Function to get a random choice for computer */

function getRandomChoice() {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    return choices[Math.floor(Math.random() * choices.length)];
}
/** Function to display the choosen card */

function displayCard(playerChoice, computerChoice) {
    computerCard.innerHTML = `<img src="${getImagePath(computerChoice)}" alt ="${computerChoice}">`;
    playerCard.innerHTML = `<img src="${getImagePath(playerChoice)}" alt ="${playerChoice}">`;
}
/** Function to get the image path based on the choice */

function getImagePath(choice) {
    switch (choice) {
        case 'rock':
            return 'rock.jpg';
        case 'paper':
            return 'paper.jpg';
        case 'scissors':
            return 'scissors.jpg';
        case 'lizard':
            return 'lizard.jpg';
        case 'spock':
            return 'spock.jpg';
        default:
            return '';
    }
}

/** Function that determin the winner of a round */

function roundWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    }
    switch (playerChoice) {
        case 'rock':
            if (computerChoice === 'scissors' || computerChoice === 'lizard') {
                return "You win! Rock crushes " + computerChoice;
            } else {
                return "You lose! " + computerChoice + " vaporizes rock";
            }
        case 'paper':
            if (computerChoice === 'rock' || computerChoice === 'spock') {
                return "You win! Paper covers " + computerChoice;
            } else {
                return "You lose! " + computerChoice + " disproves paper";
            }
        case 'scissors':
            if (computerChoice === 'paper' || computerChoice === 'lizard') {
                return "You win! Scissors cuts " + computerChoice;
            } else {
                return "You lose! " + computerChoice + " smashes scissors";
            }
        case 'lizard':
            if (computerChoice === 'paper' || computerChoice === 'spock') {
                return "You win! Lizard eats " + computerChoice;
            } else {
                return "You lose! " + computerChoice + " causes indigestion";
            }
        case 'spock':
            if (computerChoice === 'rock' || computerChoice === 'scissors') {
                return "You win! Spock desintegrates" + computerChoice;
            } else {
                return "You lose! " + computerChoice + " destroys Spock";
            }
    }
}

/** Function to update score text */

function updateScoreText() {
    computerWinsText.textContent = computerScore;
    playerWinsText.textContent = playerScore;
}

// Event listeners
startButton.addEventListener('click', startGame);
playerButtons.forEach(button => button.addEventListener('click', playRound));