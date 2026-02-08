import React, { useState, useEffect } from 'react';
import Definitions from './Definitions';

const WordSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [definitions, setDefinitions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsLoading(true);
      setError(null);
      setDefinitions(null);

      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
        .then(response => {
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error(`Word "${searchTerm}" not found in dictionary.`);
            }
            throw new Error(`Failed to fetch definition: ${response.statusText}`);
          }
          return response.json();
        })
        .then(results => {
          // Free Dictionary API returns an array of entries
          // Each entry has meanings array, each meaning has definitions array
          const allDefinitions = [];
          
          results.forEach((entry, entryIndex) => {
            entry.meanings.forEach((meaning, meaningIndex) => {
              meaning.definitions.forEach((def, defIndex) => {
                allDefinitions.push({
                  id: `${entryIndex}-${meaningIndex}-${defIndex}`,
                  partOfSpeech: meaning.partOfSpeech,
                  definition: def.definition,
                  example: def.example || null
                });
              });
            });
          });

          setDefinitions(allDefinitions);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
          setDefinitions(null);
        });
    }
  }, [searchTerm]);

  const handleSearch = () => {
    const trimmedInput = searchInput.trim();
    if (trimmedInput.length > 0) {
      setSearchTerm(trimmedInput);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="WordSearch-form">
        <input
          type="text"
          className="WordSearch-input"
          placeholder="Search for a word"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          className="WordSearch-submit"
          onClick={handleSearch}
          disabled={isLoading}
          onMouseOver={(e) => {
            if (!isLoading) {
              e.target.style.opacity = '0.9';
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseOut={(e) => {
            e.target.style.opacity = isLoading ? 0.6 : 1;
            e.target.style.transform = 'translateY(0)';
          }}
        >
          {isLoading ? 'Searching...' : 'Define'}
        </button>
      </div>
      {isLoading && <div style={{ color: 'var(--text)', marginTop: '16px' }}>Loading definition...</div>}
      {error && <div style={{ color: 'var(--error)', marginTop: '16px' }}>Error: {error}</div>}
      <Definitions searchTerm={searchTerm} definitionList={definitions} />
    </div>
  );
};

export default WordSearch;
