import React, { useState } from 'react';

export default function Flashcard(props) {

  const [ flipped, setFlipped ] = useState(false);
  const { word, definition, showDeleteButton, onDelete } = props;

  const handleClick = (e) => {
    // Don't flip if clicking the delete button
    if (!e.target.closest('.flashcard-delete-button')) {
      setFlipped(!flipped);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div
      className={`flashcard-inner ${flipped ? 'flipped' : ''}`}
      onClick={handleClick}
      style={{ position: 'relative' }}
    >
      {showDeleteButton && (
        <button
          className="flashcard-delete-button"
          onClick={handleDelete}
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'var(--error)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s ease, opacity 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.opacity = '0.9';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.opacity = '1';
          }}
          aria-label="Delete flashcard"
        >
          ×
        </button>
      )}
      <div className="flashcard">
        <div className="flashcard-face flashcard-front">
          <div className="flashcard-content">{word}</div>
        </div>
        <div className="flashcard-face flashcard-back">
          <div className="flashcard-content-back">
            <div className="flashcard-word-label">{word}</div>
            <div className="flashcard-content">{definition}</div>
          </div>
        </div>
      </div>
    </div>
  )
}