document.addEventListener('DOMContentLoaded', function () {
    // Wait for the DOM to finish loading before running the game
    // Get DOM elements
    const startButton = document.getElementById('startButton');
    const playerButtons = document.getElementsByClassName('playerButtons');
    const computerCard = document.getElementById('computerCard');
    const playerCard = document.getElementById('playerCard');
    const resultText = document.getElementById('resultText');
    const computerWinsText = document.getElementById('computerWinsText');
    const playerWinsText = document.getElementById('playerWinsText');
    const openRules = document.querySelector('#rulesLink');
    const closeRules = document.querySelector('#closeRules');
    const openFeedback = document.querySelector('#feedbackLink');
    const closeFeedback = document.querySelector('#closeFeedback');
    const rules = document.querySelector('#rules');
    const feedback = document.querySelector('#feedback');

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
        Array.from(playerButtons).forEach(button => button.disabled = false);
        resultText.textContent = "";
        computerCard.innerHTML = `<img src="assets/images/logo.png" alt="Rock, paper, scissors, lizard, spock logo">`;
        playerCard.innerHTML = `<img src="assets/images/logo.png" alt="Rock, paper, scissors, lizard, spock logo">`;
    }
    /** Function to play a round in the game */

    function playRound() {
        const playerChoice = this.textContent.toLowerCase();
        const computerChoice = getRandomChoice();
        const result = roundWinner(playerChoice, computerChoice);

        displayCard(playerChoice, computerChoice);
        resultText.textContent = result;

        if (result.includes("win")) {
            playerScore++;
        } else if (result.includes("lose")) {
            computerScore++;
        }

        updateScoreText();

        if (playerScore === 5 || computerScore === 5) {
            Array.from(playerButtons).forEach(button => button.disabled = true);
            resultText.innerHTML += "<br><strong>Game over!</strong>";
        }
    }
    /** Function to get a random choice for computer */

    function getRandomChoice() {
        const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
        return choices[Math.floor(Math.random() * choices.length)];
    }
    /** Function to display the choosen card */

    function displayCard(playerChoice, computerChoice) {
        const imagePath = 'assets/images/';
        computerCard.innerHTML = `<img src="${imagePath}${computerChoice}.jpg" alt ="${computerChoice}">`;
        playerCard.innerHTML = `<img src="${imagePath}${playerChoice}.jpg" alt ="${playerChoice}">`;
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
                };
            case 'paper':
                if (computerChoice === 'rock' || computerChoice === 'spock') {
                    return "You win! Paper covers " + computerChoice;
                } else {
                    return "You lose! " + computerChoice + " disproves paper";
                };
            case 'scissors':
                if (computerChoice === 'paper' || computerChoice === 'lizard') {
                    return "You win! Scissors cuts " + computerChoice;
                } else {
                    return "You lose! " + computerChoice + " smashes scissors";
                };
            case 'lizard':
                if (computerChoice === 'paper' || computerChoice === 'spock') {
                    return "You win! Lizard eats " + computerChoice;
                } else {
                    return "You lose! " + computerChoice + " causes indigestion";
                };
            case 'spock':
                if (computerChoice === 'rock' || computerChoice === 'scissors') {
                    return "You win! Spock desintegrates " + computerChoice;
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
    Array.from(playerButtons).forEach(button => button.addEventListener('click', playRound));
    openRules.addEventListener('click', function () {
        rules.showModal();
    });
    closeRules.addEventListener('click', function () {
        rules.close();
    });
    openFeedback.addEventListener('click', function () {
        feedback.showModal();
    });
    closeFeedback.addEventListener('click', function (event) {
        event.preventDefault();
        feedback.close();
    });
});