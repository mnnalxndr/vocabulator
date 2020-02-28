import React, { useState } from 'react';
import Flashcard from './Flashcard';

const wordList = [
  {
    word: 'Word 1',
    definition: 'Definition 1'
  },
  {
    word: 'Word 2',
    definition: 'Definition 2'
  },
  {
    word: 'Word 3',
    definition: 'Definition 3'
  },
  {
    word: 'Word 4',
    definition: 'Definition 4'
  },
  {
    word: 'Word 5',
    definition: 'Definition 5'
  }
]

const INDIVIDUAL = 'individual';
const SET = 'set';

const TEST_TYPES = [
  {
    value: INDIVIDUAL,
    label: 'Individual'
  },
  {
    value: SET,
    label: 'Set'
  },
]

export default function Test() {

  const [ testType, setTestType ] = useState(TEST_TYPES[0].value);

  return(
    <div>
      {'Test Type:'}
      {TEST_TYPES.map(type => (
        <button
          onClick={() => setTestType(type.value)}
        >
          {type.label}
        </button>
      ))}
      <div className="flashcard-wrapper">
        {
          testType === INDIVIDUAL
          ? <Flashcard word={wordList[0].word} definition={wordList[0].definition} />
          : wordList.map(word => (
            <Flashcard 
              word={word.word}
              definition={word.definition}
            />
          ))
        }
      </div>
    </div>
  )
};
