// We've filter words. Now to categorise into something usable.

import { writeFileSync } from 'fs';

class AlphaDictionary {
  public constructor(){};

  public T = [];
  public L = [];
  public E = [];
  public F = [];
  public V = [];
  public N = [];
  public B = [];
  public A = [];
  public R = [];
  public W = [];
  public O = [];
  public S = [];
  public Y = [];
  public D = [];
  public I = [];
  public H = [];
  public U = [];
}


// Length of word without punctuation
const bigDictionary = {
  '1': new AlphaDictionary(),
  '2': new AlphaDictionary(),
  '3': new AlphaDictionary(),
  '4': new AlphaDictionary(),
  '5': new AlphaDictionary(),
  '6': new AlphaDictionary(),
  '7': new AlphaDictionary(),
  '8': new AlphaDictionary(),
  '9': new AlphaDictionary(),
  '10': new AlphaDictionary(),
  '11': new AlphaDictionary(),
  '12': new AlphaDictionary(),
  '13': new AlphaDictionary(),
  '14': new AlphaDictionary(),
  '15': new AlphaDictionary(),
  '16': new AlphaDictionary(),
  '17': new AlphaDictionary(),
  '18': new AlphaDictionary(),
  '19': new AlphaDictionary()
}

// Let's load in from the filteredWords.txt file and start
// to categorise these values in to more a more predictable
// format. (length of alpha chars > first letter)
import * as lbl from 'line-by-line';

const lr = new lbl('./filteredWords.txt');

lr.on('error', err => {
  console.log('err', err);
  process.exit(1);
});

lr.on('line', line => {
	lr.pause();

  const alphaLength = countAlphaChars(line);

  if (alphaLength) {
    if (line.toString().charAt(0) != '\'') {

      // console.log(line.toString().toUpperCase().charAt(0));
      bigDictionary[alphaLength.toString()][line.toString().toUpperCase().charAt(0)].push(line);
    }
  }

  // console.log(countAlphaChars(line), line)

  lr.resume();
});

lr.on('end', () => {
  console.log('Done!');
  // console.log(JSON.stringify(bigDictionary))

  writeFileSync('./categorised.json', JSON.stringify(bigDictionary, null, 2));

  console.log('Written to disk...');
});


const countAlphaChars = (input: string): number => {
  return input.match(/[a-zA-Z]/g).length;
}
