import React, { useState, useEffect } from 'react';
import Definitions from './Definitions';

const WordSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [definitions, setDefinitions] = useState();

  
  useEffect(() => {
    if (searchTerm.length > 0) {
      fetch(`https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${searchTerm}?fields=definitions,examples&strictMatch=true`, {
        headers: {
          "Accept": "application/json",
          "app_id": "95321022",
          "app_key": "67f37c1d36e23e98452025364b6e0af9"
        }
      })
      .then(response => response.json())
      .then(results => {
        setDefinitions(results.results[0].lexicalEntries.map(entry => {
          const def = entry.entries[0].senses[0]; 
          return {
            id: def.id,
            definition: def.definitions[0],
            example: def.examples[0].text
          }
        }))
      })
    }
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a word"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <br />
      <button type="button" onClick={() => setSearchTerm(searchInput)}>Define</button>
      <br/>
      <Definitions searchTerm={searchTerm} definitionList={definitions} />
    </div>
  );
};

export default WordSearch;
