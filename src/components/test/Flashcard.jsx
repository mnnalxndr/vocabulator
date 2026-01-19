import React, { useState } from 'react';

export default function Flashcard(props) {

  const [ flipped, setFlipped ] = useState(false);
  const { word, definition } = props;

  return (
    <div
      className={`flashcard ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flashcard-content">
        { flipped ? definition : word }
      </div>
    </div>
  )
}