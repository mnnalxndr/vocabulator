import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import { getFlashcards } from '../../utils/flashcardStorage';

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
  const [testType, setTestType] = useState(TEST_TYPES[0].value);
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    const flashcards = getFlashcards();
    setWordList(flashcards);
  }, []);

  if (wordList.length === 0) {
    return (
      <div style={{ marginTop: '20px', padding: '20px' }}>
        <p>No flashcards in your collection yet.</p>
        <p>Go to "New Word" to search for words and save definitions to your collection.</p>
      </div>
    );
  }

  return(
    <div>
      <div style={{ marginBottom: '20px' }}>
        {'Test Type:'}
        {TEST_TYPES.map(type => (
          <button
            key={type.value}
            onClick={() => setTestType(type.value)}
            style={{
              marginLeft: '10px',
              padding: '8px 16px',
              backgroundColor: testType === type.value ? '#2196f3' : '#f0f0f0',
              color: testType === type.value ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {type.label}
          </button>
        ))}
      </div>
      <div className="flashcard-wrapper">
        {
          testType === INDIVIDUAL
          ? <Flashcard word={wordList[0].word} definition={wordList[0].definition} />
          : wordList.map((flashcard, index) => (
            <Flashcard 
              key={index}
              word={flashcard.word}
              definition={flashcard.definition}
            />
          ))
        }
      </div>
    </div>
  )
};
