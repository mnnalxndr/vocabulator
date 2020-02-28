import React, { useState } from 'react';

export default function Flashcard(props) {

  const [ flipped, setFlipped ] = useState(false);
  const { word, definition } = props;

  return (
    <div
      className="flashcard"
      onClick={() => setFlipped(!flipped)}
    >
      <span className="flashcard-content">{ flipped ? definition : word }</span>
    </div>
  )
}