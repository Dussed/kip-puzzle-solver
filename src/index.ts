const allWords = require('../categorised');

const allLetters = 'TLEFVNBARWEENAOESRYNOFEDNSIEEIVITSHRUEDOAHE'.split(''); // I'm lazy don't judge.
const allBlanks = ['____', '_', '_', '_________', '___', '_\'__', '________________________']; // 43 in total

const fillBlanks = (blanks: string[]) => {

  let availableLetters = allLetters;

    for (let i = 0; i < blanks.length; i++) {
      if (i == blanks.length-1) {
        // LAST ONE, PREDICT WORDS
        console.log('predict words here');

      } else {
        // We know the layout of this word, let's find a match
        findMatches(blanks[i], availableLetters)
      }

    }

};


const findMatches = (blank, availableLetters) => {
  console.log(blank, availableLetters)
}



let blankWordStep = 0;
fillBlanks(allBlanks);
