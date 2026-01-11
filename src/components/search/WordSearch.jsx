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
      <input
        type="text"
        placeholder="Search for a word"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <br />
      <button type="button" onClick={handleSearch} disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Define'}
      </button>
      <br/>
      {isLoading && <div>Loading definition...</div>}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>Error: {error}</div>}
      <Definitions searchTerm={searchTerm} definitionList={definitions} />
    </div>
  );
};

export default WordSearch;
