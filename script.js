// DOM elements
const container = document.getElementById("container"),
      sideBar = document.getElementById("sideBar"),
      card = document.createElement('div');

let bigBlast = blastSelector(),  // Generate initial blast position
    currentPosition = 1;         // Initial position

// Event Listeners
document.getElementById("nextBtn").addEventListener("click", bombFinder);

// Initial card setup
card.classList.add("card");
container.appendChild(card);

// Function to handle the bomb finding logic.
function bombFinder() {
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
    card.textContent = numberToOrdinal(currentPosition);  // Set card text
    container.appendChild(card);  // Append card to container
}

// Function to convert a number to its ordinal form and word representation.
function numberToOrdinal(n) {
    const ordinals = ["th", "st", "nd", "rd"],
          exceptions = [11, 12, 13],
          words = ["Zeroth", "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth", "Thirteenth", "Fourteenth", "Fifteenth", "Sixteenth", "Seventeenth", "Eighteenth", "Nineteenth", "Twentieth", "Twenty-first", "Twenty-second", "Twenty-third", "Twenty-fourth", "Twenty-fifth", "Twenty-sixth", "Twenty-seventh", "Twenty-eighth", "Twenty-ninth", "Thirtieth", "Thirty-first"],
          v = n % 100,
          ordinal = exceptions.includes(v) ? ordinals[0] : (ordinals[v % 10] || ordinals[0]),
          word = words[n];

    return `${n}${ordinal} - ${word}`;
}
