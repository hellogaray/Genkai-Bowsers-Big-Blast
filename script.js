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
    const card = document.createElement('div');
    card.classList.add('card');
    
    const cardText = document.createElement('div');
    cardText.classList.add('card-text');
    cardText.textContent = numberToOrdinal(currentPosition);  // Set card text

    card.appendChild(cardText);  // Append text to card
    container.appendChild(card);  // Append card to container
}

// Function to convert a number to its ordinal form and word representation.
function numberToOrdinal(n) {
    const englishOrdinals = ["th", "st", "nd", "rd"],
          englishExceptions = [11, 12, 13],
          englishWords = ["Zeroth", "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth", "Thirteenth", "Fourteenth", "Fifteenth", "Sixteenth", "Seventeenth", "Eighteenth", "Nineteenth", "Twentieth", "Twenty-first", "Twenty-second", "Twenty-third", "Twenty-fourth", "Twenty-fifth", "Twenty-sixth", "Twenty-seventh", "Twenty-eighth", "Twenty-ninth", "Thirtieth", "Thirty-first"],
          japaneseWords = ["零番目", "一番目", "二番目", "三番目", "四番目", "五番目", "六番目", "七番目", "八番目", "九番目", "十番目", "十一番目", "十二番目", "十三番目", "十四番目", "十五番目", "十六番目", "十七番目", "十八番目", "十九番目", "二十番目", "二十一番目", "二十二番目", "二十三番目", "二十四番目", "二十五番目", "二十六番目", "二十七番目", "二十八番目", "二十九番目", "三十番目", "三十一番目"],
          v = n % 100,
          englishOrdinal = englishExceptions.includes(v) ? englishOrdinals[0] : (englishOrdinals[v % 10] || englishOrdinals[0]),
          englishWord = englishWords[n],
          japaneseWord = japaneseWords[n];

    return `${n}${englishOrdinal} - ${englishWord} 「${japaneseWord}」`;
}


