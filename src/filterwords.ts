// TLDR: got a big list of words, but we only want a smaller subset.

import { createWriteStream } from 'fs';
import * as lbl from 'line-by-line';

// All letters used
const allLetters = 'TLEFVNBARWEENAOESRYNOFEDNSIEEIVITSHRUEDOAHE';
// unique allowed chars
const allowedLetters = ['T','L','E','F','V','N','B','A','R','W','O','S','Y','D','I','H','U','\''];
const letterFrequency = {};

// Loop over allLetters and get occurance counts
allLetters.split('').forEach(char => {
  if (letterFrequency.hasOwnProperty(char)) letterFrequency[char]++;
  else letterFrequency[char] = 1;
})


const lr = new lbl('./words.txt');

const stream = createWriteStream('./filteredWords.txt');

let readCount = 0;
let validCount = 0;

lr.on('error', err => {
  console.log('err', err);
  process.exit(1);
});

lr.on('line', line => {
	lr.pause();

  if (isWordValid(line)) {
    console.log(line, 'is valid');
    validCount++;

    stream.write(line + '\n');

  }

  readCount++;

  lr.resume();// when done
});

lr.on('end', () => {
  console.log('All done! got', validCount, 'words, from', readCount);
  
  // Get outta here.
  // setTimeout(() => process.exit(0), 1000);
});

const isWordValid = (word: string) => {
  let isValid = true;

  word = word.toUpperCase();

  // Check chars are allowed
  word.split('').forEach(char => {
    if (!allowedLetters.includes(char)) isValid = false;
  })


  // Check letter freqency
  const letterFrequencyInWord = {};

  word.split('').forEach(char => {
    if (letterFrequencyInWord.hasOwnProperty(char)) letterFrequencyInWord[char]++;
    else letterFrequencyInWord[char] = 1;
  })


  // Loop over letter frequency for word and compare to global
  // This isn't super effective, but will knock out some more words

  Object.keys(letterFrequencyInWord).forEach(charInWord => {
    if (/^[a-z0-9]+$/i.test(charInWord)) { // Check alpha
      if (letterFrequency.hasOwnProperty(charInWord)) { // It should always do anyway? eh
        // If this char has more occurances than the global one.. it's out.
        if (letterFrequencyInWord[charInWord] > letterFrequency[charInWord]) isValid = false; 
      } else isValid = false;
    }
  })



  // Check lengths (can't do yet!)

  return isValid;
};