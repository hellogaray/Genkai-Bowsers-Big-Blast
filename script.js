// DOM elements
const container = document.getElementById("container"),
      sideBar = document.getElementById("sideBar"),
      card = document.createElement('div');

let bigBlast = blastSelector(), // Generate initial blast position
    currentPosition = 1,        // Initial position
    isPaused = false,           // Game paused state
    isMuted = false,            // Music state
    themeSong = new Audio('./music/theme.mp3');

// Event Listeners
document.getElementById("nextBtn").addEventListener("click", bombFinder);
document.addEventListener("keydown", togglePause);  // Listen for 'P' key press

// Initial card setup
card.classList.add("card");
container.appendChild(card);

// Function to handle the bomb finding logic.
function bombFinder() {
    if (isPaused) return;  // Do nothing if the game is paused

    console.log("Big Blast Position: " + bigBlast);
    console.log("Current Position: " + currentPosition);

    // Clear previous card content
    container.innerHTML = '';

    // Create and display the current position card
    cardCreator(currentPosition);

    // Check if the current position matches the blast position
    if (currentPosition === bigBlast) {
        console.log("You died!");

        // Reset the bigBlast position
        bigBlast = blastSelector();
        document.getElementById('nextBtn').disabled = true;  // Disable the button
    } else {
        currentPosition += 1;  // Increment the position
        console.log("You're alive");
    }
}

// Function to randomly generate a blast position between 1 and 31.
function blastSelector() {
    return Math.floor(Math.random() * 31) + 1;
}

// Function to create and display a card with the current position.
function cardCreator(currentPosition) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const cardText = document.createElement('div');
    cardText.classList.add('card-text');
    cardText.textContent = numberToOrdinal(currentPosition);  // Set card text

    card.appendChild(cardText);

    // Create and append the circular number element
    const numberCircle = document.createElement('div');
    numberCircle.classList.add('number-circle');
    numberCircle.textContent = currentPosition;
    card.appendChild(numberCircle);

    container.appendChild(card);
}

// Function to convert a number to its ordinal form.
function numberToOrdinal(n) {
    const englishOrdinals = ["th", "st", "nd", "rd"],
          englishExceptions = [11, 12, 13],
          v = n % 100,
          englishOrdinal = englishExceptions.includes(v) ? englishOrdinals[0] : (englishOrdinals[v % 10] || englishOrdinals[0]);
    return `「${n}${englishOrdinal}」`;
}

// Function to toggle the paused state of the game.
function togglePause(event) {
    if (event.key.toLowerCase() === 'p') {
        isPaused = !isPaused;
        isMuted = !isMuted;
        toggleMusic()
        console.log(isPaused ? "Game paused" : "Game resumed");
    } else if (event.key.toLowerCase() === 'm') {
        toggleMusic()
    } else if (event.key.toLowerCase() === 'r') {
        restartGame()
    }
}

// Function to toggle the music state.
function toggleMusic() {
    isMuted = !isMuted;
    if (themeSong.paused) {
        themeSong.play();
    } else {
        themeSong.pause();
    }
    console.log(isMuted ? "Music stoped" : "Music resumed");
}

// Function to restart game.
function restartGame() {
    location.reload();
}

themeSong.loop = true
themeSong.play()