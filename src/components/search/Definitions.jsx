import React, { useState, useEffect } from 'react';
import './definition.css';
import { saveFlashcard, isFlashcardDuplicate } from '../../utils/flashcardStorage';
import Notification from '../common/Notification';

const Definitions = (props) => {
  const { searchTerm, definitionList } = props;
  const [savedFlashcards, setSavedFlashcards] = useState(new Set());
  const [notification, setNotification] = useState(null);
  
  // Check which definitions are already saved when definitionList changes
  useEffect(() => {
    if (searchTerm && definitionList && definitionList.length > 0) {
      const savedSet = new Set();
      definitionList.forEach(entry => {
        if (isFlashcardDuplicate(searchTerm, entry.definition)) {
          savedSet.add(entry.id);
        }
      });
      setSavedFlashcards(savedSet);
    }
  }, [searchTerm, definitionList]);
  
  if (!searchTerm) {
    return null;
  }

  if (!definitionList || definitionList.length === 0) {
    return null;
  }

  const handleSaveFlashcard = (definition) => {
    const result = saveFlashcard(searchTerm, definition);
    
    if (result.success) {
      // Find the entry ID to mark it as saved
      const entry = definitionList.find(e => e.definition === definition);
      if (entry) {
        setSavedFlashcards(prev => new Set(prev).add(entry.id));
      }
      setNotification({ message: result.message, type: 'success' });
    } else {
      // Check if it's a duplicate
      if (result.message.includes('already exists')) {
        const entry = definitionList.find(e => e.definition === definition);
        if (entry) {
          setSavedFlashcards(prev => new Set(prev).add(entry.id));
        }
        setNotification({ message: 'Already in collection', type: 'info' });
      } else {
        setNotification({ message: result.message, type: 'error' });
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };
  
  return (
    <div style={{ marginTop: '20px' }}>
      <Notification 
        message={notification?.message} 
        type={notification?.type} 
        onClose={handleCloseNotification}
      />
      <h3>Definitions for "{searchTerm}"</h3>
      {definitionList.map(entry => {
        const isSaved = savedFlashcards.has(entry.id);
        return (
          <div key={entry.id} className="definition">
            {entry.partOfSpeech && (
              <div style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '5px' }}>
                {entry.partOfSpeech}
              </div>
            )}
            <div style={{ marginBottom: '5px' }}>{entry.definition}</div>
            {entry.example && (
              <div style={{ fontStyle: 'italic', color: '#666', marginTop: '5px' }}>
                Example: "{entry.example}"
              </div>
            )}
            <button
              className={`save-button ${isSaved ? 'saved' : ''}`}
              onClick={() => handleSaveFlashcard(entry.definition)}
              disabled={isSaved}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: isSaved ? '#4caf50' : '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSaved ? 'default' : 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {isSaved ? '✓ Saved' : 'Save to Collection'}
            </button>
          </div>
        );
      })}
    </div>
  )
};

export default Definitions;