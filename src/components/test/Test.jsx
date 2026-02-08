import React, { useState, useEffect, useMemo } from 'react';
import Flashcard from './Flashcard';
import { getFlashcards, deleteFlashcard } from '../../utils/flashcardStorage';

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
];

const ORDER_ADDED = 'orderAdded';
const ALPHABETICAL = 'alphabetical';
const RANDOMISED = 'randomised';

const SET_VIEW_SORT_OPTIONS = [
  { value: ORDER_ADDED, label: 'Order added' },
  { value: ALPHABETICAL, label: 'Alphabetical' },
  { value: RANDOMISED, label: 'Randomised' },
];

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Test() {
  const [testType, setTestType] = useState(TEST_TYPES[0].value);
  const [wordList, setWordList] = useState([]);
  const [shuffledList, setShuffledList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [setViewSortOrder, setSetViewSortOrder] = useState(ORDER_ADDED);

  // Derived list for Set view (order added / alphabetical / randomised)
  const setViewDisplayList = useMemo(() => {
    if (wordList.length === 0) return [];
    if (setViewSortOrder === ORDER_ADDED) return wordList;
    if (setViewSortOrder === ALPHABETICAL) {
      return [...wordList].sort((a, b) =>
        a.word.localeCompare(b.word, undefined, { sensitivity: 'base' })
      );
    }
    return shuffleArray(wordList);
  }, [wordList, setViewSortOrder]);

  // Load flashcards on mount
  useEffect(() => {
    const flashcards = getFlashcards();
    setWordList(flashcards);
  }, []);

  // Shuffle cards when switching to Individual mode
  useEffect(() => {
    if (testType === INDIVIDUAL && wordList.length > 0) {
      const shuffled = shuffleArray(wordList);
      setShuffledList(shuffled);
      setCurrentIndex(0);
      setIsCompleted(false);
    }
  }, [testType, wordList]);

  const handleNext = () => {
    if (currentIndex < shuffledList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsCompleted(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleTestTypeChange = (newType) => {
    setTestType(newType);
    // Reset index and completion when switching modes
    setCurrentIndex(0);
    setIsCompleted(false);
    // Exit edit mode when switching test types
    setIsEditMode(false);
  };

  const handleDeleteFlashcard = (word, definition) => {
    const result = deleteFlashcard(word, definition);
    if (result.success) {
      // Reload flashcards to update the list
      const flashcards = getFlashcards();
      setWordList(flashcards);
    }
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  if (wordList.length === 0) {
    return (
      <div style={{ marginTop: '20px', padding: '20px' }}>
        <p>No flashcards in your collection yet.</p>
        <p>Go to "New Word" to search for words and save definitions to your collection.</p>
      </div>
    );
  }

  const currentCard = shuffledList.length > 0 ? shuffledList[currentIndex] : null;
  const isLastCard = testType === INDIVIDUAL && shuffledList.length > 0 && currentIndex === shuffledList.length - 1;

  return(
    <div>
      <div className="Test-toolbar">
        <div className="Test-toolbar-row Test-toolbar-row--test-type">
          <span className="Test-toolbar-label">Test Type:</span>
          <div className="Test-toolbar-row__options">
            {TEST_TYPES.map(type => (
              <button
                key={type.value}
                onClick={() => handleTestTypeChange(type.value)}
                className="Test-type-button"
                style={{
                  backgroundColor: testType === type.value ? 'var(--info)' : 'var(--button-bg)',
                  color: testType === type.value ? 'white' : 'var(--button-text)',
                }}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        {testType === SET && (
            <div className="Test-toolbar-row">
              <span className="Test-toolbar-label">Order:</span>
              <select
                value={setViewSortOrder}
                onChange={(e) => setSetViewSortOrder(e.target.value)}
                className="Test-sort-select"
              >
                {SET_VIEW_SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
      </div>
      <div className={`flashcard-wrapper ${testType === INDIVIDUAL ? 'individual-mode' : 'set-mode'}`}>
        {
          testType === INDIVIDUAL
          ? (
              <>
                {currentCard && (
                  <Flashcard 
                    key={currentIndex}
                    word={currentCard.word} 
                    definition={currentCard.definition}
                  />
                )}
                {shuffledList.length > 0 && (
                  <div className="Test-actions">
                    <div style={{ color: 'var(--text)', fontSize: '14px' }}>
                      Card {currentIndex + 1} of {shuffledList.length}
                    </div>
                    {isCompleted ? (
                      <div style={{ 
                        padding: '15px 20px',
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '8px',
                        color: 'var(--text)',
                        fontSize: '16px',
                        fontWeight: '500',
                        textAlign: 'center'
                      }}>
                        🎉 You finished all cards! Great job!
                      </div>
                    ) : (
                      <button
                        onClick={handleNext}
                        style={{
                          padding: '10px 24px',
                          backgroundColor: 'var(--info)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: '500',
                          transition: 'opacity 0.2s ease, transform 0.1s ease'
                        }}
                        onMouseOver={(e) => {
                          if (!isLastCard) {
                            e.target.style.opacity = '0.9';
                            e.target.style.transform = 'translateY(-1px)';
                          }
                        }}
                        onMouseOut={(e) => {
                          e.target.style.opacity = '1';
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        {isLastCard ? 'Finish' : 'Next'}
                      </button>
                    )}
                  </div>
                )}
              </>
            )
          : setViewDisplayList.map((flashcard, index) => (
            <Flashcard 
              key={`${flashcard.word}-${index}`}
              word={flashcard.word}
              definition={flashcard.definition}
              showDeleteButton={isEditMode}
              onDelete={() => handleDeleteFlashcard(flashcard.word, flashcard.definition)}
            />
          ))
        }
      </div>
      {testType === SET && (
        <div className="Test-remove-words-wrap">
          <button
            className="Test-edit-mode-button"
            onClick={handleToggleEditMode}
            style={{
              backgroundColor: isEditMode ? 'var(--error)' : 'var(--button-bg)',
              color: isEditMode ? 'white' : 'var(--button-text)',
            }}
          >
            {isEditMode ? 'Done' : 'Remove Words'}
          </button>
        </div>
      )}
    </div>
  )
};
