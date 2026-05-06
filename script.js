// Scores
let userScore = 0;
let computerScore = 0;

// Computer choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissor'];
    return choices[Math.floor(Math.random() * choices.length)];
}

// Play round
function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    let result = "";

    if (userChoice === computerChoice) {
        result = "It's a tie!";
    } 
    else if (
        (userChoice === 'rock' && computerChoice === 'scissor') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissor' && computerChoice === 'paper')
    ) {
        result = "You win!";
        userScore++;
    } 
    else {
        result = "Computer wins!";
        computerScore++;
    }

    // Update UI
    document.getElementById('you').innerText = userScore;
    document.getElementById('computer').innerText = computerScore;
    document.getElementById('move').innerText =
        `You: ${userChoice} | Computer: ${computerChoice} → ${result}`;

    saveGameState();
}

// Save state
function saveGameState() {
    const gameState = {
        userScore,
        computerScore
    };
    localStorage.setItem('rpsGameState', JSON.stringify(gameState));
}

// Load state
function loadGameState() {
    const gameState = JSON.parse(localStorage.getItem('rpsGameState'));

    if (gameState) {
        userScore = gameState.userScore;
        computerScore = gameState.computerScore;

        document.getElementById('you').innerText = userScore;
        document.getElementById('computer').innerText = computerScore;
    }
}

// Reset game
function resetGame() {
    userScore = 0;
    computerScore = 0;

    document.getElementById('you').innerText = 0;
    document.getElementById('computer').innerText = 0;
    document.getElementById('move').innerText = "Game reset. Start playing!";

    localStorage.removeItem('rpsGameState');
}

// Events (safe DOM load)
window.addEventListener("DOMContentLoaded", () => {

    loadGameState();

    document.getElementById('rock').addEventListener('click', () => playRound('rock'));
    document.getElementById('paper').addEventListener('click', () => playRound('paper'));
    document.getElementById('scissor').addEventListener('click', () => playRound('scissor'));

    document.getElementById('resetBtn').addEventListener('click', resetGame);
});