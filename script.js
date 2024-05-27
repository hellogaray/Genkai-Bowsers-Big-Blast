
// DOM elements
const container = document.getElementById("container"),
      sideBar = document.getElementById("sideBar"),
      card = document.createElement('div'),
      block = document.createElement('div'),  // Create block element
      imageDiv = document.getElementById("imageDiv"),
      jsImg = document.createElement("img");

// Variables
let bigBlast = blastSelector(), // Generate initial blast position
    currentPosition = 1,        // Initial position
    isPaused = false,            // Game paused state
    isMuted = false,             // Music state
    themeSong = new Audio('./music/theme.mp3'),
    jsSound = new Audio('./music/ahahah.mp3'),
    blockHitSound = new Audio('./music/block_hit.mp3'),
    marioDies = new Audio('./music/smb_mariodie.wav'),
    numberCircle = document.getElementsByClassName("number-circle");

// Event Listeners
document.getElementById("nextBtn").addEventListener("click", bombFinder);
document.addEventListener("keydown", togglePause);  // Listen for 'P' key press
block.classList.add('block');  // Add 'block' class to the block element
container.appendChild(block);
jsImg.src = './images/Ahahah.webp';

// Function to handle the bomb finding logic.
function bombFinder() {
    if (isPaused) return;  // Do nothing if the game is paused

    console.log("Big Blast Position: " + bigBlast);
    console.log("Current Position: " + currentPosition);
   
    updateCardOrdinal(currentPosition);
    
    if (currentPosition >= bigBlast) {
        console.log("You died!");

        // Display game over screen
        showGameOverScreen();
        
        // Reset the bigBlast position
        themeSong.pause();
        marioDies.play();
        document.getElementById('nextBtn').disabled = true;  // Disable the button
    } else {
        currentPosition++;

        // Break some pixels
        const pixels = block.querySelectorAll('.pixel:not(.broken)');
        const breakPixelCount = Math.ceil(pixels.length / 10);
        dropAnimation(pixels, breakPixelCount)
        console.log("You're alive");
        blockHitSound.play();

    }
}

// Inside the showGameOverScreen() function
function showGameOverScreen() {
    const gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.display = 'flex';

    var defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['000000', 'ebb208', 'ff5622']
      };
      
      function shoot() {
        confetti({
          ...defaults,
          particleCount: 100,
          scalar: 1.2,
          shapes: ['star']
        });
      
        confetti({
          ...defaults,
          particleCount: 100,
          scalar: 1.2,
          shapes: ['circle']
        });
      }
      
      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
}

// Function to restart the game
function restartGame() {
    // Hide game over screen
    const gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.display = 'none';

    // Reset game state
    currentPosition = 0;
}

// Function to add drop animation to pixels.
function dropAnimation(pixels, breakPixelCount) {
    for (let i = 0; i < breakPixelCount; i++) {
        const randomPixelIndex = Math.floor(Math.random() * pixels.length);
        pixels[randomPixelIndex].style.animation = 'float 3s ease-out';
        setTimeout(() => {
            pixels[randomPixelIndex].style.backgroundColor = '';
            pixels[randomPixelIndex].classList.add('broken');
        }, 2000);
    }
}

// Function to randomly generate a blast position between 1 and 31.
function blastSelector() {
    return Math.floor(Math.random() * 26) + 5;
}

// Function to update the ordinal number in card elements
function updateCardOrdinal(currentPosition) {
    // Convert number to ordinal
    var ordinal = numberToOrdinal(currentPosition);

    // Get all elements with the class name "card-ordinal"
    let cardOrdinalElements = document.getElementsByClassName("card-ordinal");

    // Update the text content of each element
    Array.from(cardOrdinalElements).forEach(element => {
        element.textContent = ordinal;
    });
}

// Define the Mario coin block pattern (example)
const coinBlockPattern = [
    ['#000000', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622'],
    ['#ff5622', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#000000'],
    ['#ff5622', '#ebb208', '#000000', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#000000', '#ebb208', '#000000'],
    ['#ff5622', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#000000'],
    ['#ff5622', '#ebb208', '#ebb208', '#ebb208', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ebb208', '#ebb208', '#ebb208', '#000000'],
    ['#ff5622', '#ebb208', '#ebb208', '#ebb208', '#ff5622', '#ff5622', '#000000', '#000000', '#000000', '#000000', '#ff5622', '#ff5622', '#000000', '#ebb208', '#ebb208', '#000000'],
    ['#ff5622', '#ebb208', '#ebb208', '#ebb208', '#ff5622', '#ff5622', '#000000', '#ebb208', '#ebb208', '#ebb208', '#ff5622', '#ff5622', '#000000', '#ebb208', '#ebb208', '#000000'],
    ['#ff5622', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#000000', '#000000', '#ebb208', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#000000', '#ebb208', '#ebb208', '#000000'],
    ['#ff5622', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#ff5622', '#000000', '#ebb208', '#ebb208', '#000000'],
    ['#ff5622', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ff5622', '#ff5622', '#000000', '#000000', '#000000', '#000000', '#ebb208', '#ebb208', '#000000'],
    ['#ff5622', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ff5622', '#ff5622', '#000000', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#000000'],
    ['#ff5622', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#000000'],
    ['#ff5622', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ff5622', '#ff5622', '#000000', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#000000'],
    ['#ff5622', '#ebb208', '#000000', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ff5622', '#ff5622', '#000000', '#ebb208', '#ebb208', '#ebb208', '#000000', '#ebb208', '#000000'],
    ['#ff5622', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#ebb208', '#000000'],
    ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000']
];

// Scale pattern to match 40x40 grid
const scaledPattern = [];
for (let i = 0; i < 40; i++) {
    for (let j = 0; j < 40; j++) {
        let color = coinBlockPattern[Math.floor(i / 2.5)][Math.floor(j / 2.5)];
        scaledPattern.push(color);
    }
}

// Function to create and display a block of pixels.
function blockCreator() {
    for (let i = 0; i < 1600; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.backgroundColor = scaledPattern[i];  // Set pixel color from pattern
        block.appendChild(pixel);
    }
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
        toggleMusic();
        console.log(isPaused ? "Game paused" : "Game resumed");
        if (isPaused) {
            jsSound.play();
            overlay.style.display = 'block'; // Display the overlay
            document.querySelector('#nextBtn').textContent = 'GAME IS PAUSED';
        } else {
            jsSound.pause();
            overlay.style.display = 'none'; // Hide the overlay
            document.querySelector('#nextBtn').textContent = '次 (つぎ)';
        }
    } else if (event.key.toLowerCase() === 'm') {
        toggleMusic();
    } else if (event.key.toLowerCase() === 'r') {
        restartGame();
    }
}

// Create overlay element
var overlay = document.createElement('div');
overlay.classList.add('overlay'); // Add the 'overlay' class to the overlay element
document.body.appendChild(overlay);

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

blockCreator();
themeSong.loop = true;
themeSong.play();


