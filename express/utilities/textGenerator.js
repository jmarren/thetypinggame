function generateTypingText(chars, textLength) {
    let text = '';
    let currentWordLength = 0;
    let targetWordLength = getRandomWordLength();

    while (text.length < textLength) {
        // Randomly select a character
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Add character to text
        text += char;
        currentWordLength++;

        // Check if the current word has reached its target length
        if (currentWordLength >= targetWordLength && text.length < textLength - 1) {
            text += ' ';
            currentWordLength = 0;
            targetWordLength = getRandomWordLength(); // Get a new target length for the next word
        }
    }

    return text;
}

function getRandomWordLength() {
    // Generate a random word length between 1 and 12
    return Math.floor(Math.random() * 12) + 1;
}

module.exports = {generateTypingText};
