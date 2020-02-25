import React, { useState } from 'react';

const WordSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState(searchInput);

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
      {searchTerm}
    </div>
  );
};

export default WordSearch;
