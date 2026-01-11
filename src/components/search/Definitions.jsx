import React from 'react';
import './definition.css';

const Definitions = (props) => {
  const { searchTerm, definitionList } = props;
  
  if (!searchTerm) {
    return null;
  }

  if (!definitionList || definitionList.length === 0) {
    return null;
  }
  
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Definitions for "{searchTerm}"</h3>
      {definitionList.map(entry => (
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
        </div>
      ))}
    </div>
  )
};

export default Definitions;