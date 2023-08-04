const fs = require('fs');

function generateRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function generateRandomInputFile() {
  const numberOfLines = 10;
  const outputFile = 'input.txt';

  let numbers = '';
  for (let i = 0; i < numberOfLines; i++) {
    const randomNumber = generateRandomFloat(0, 1000); // Adjust the range as needed
    numbers += randomNumber.toFixed(2) + '\n';
  }

  fs.writeFile(outputFile, numbers, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log(`Successfully generated ${numberOfLines} lines of random floating numbers and saved to "${outputFile}".`);
    }
  });

}
