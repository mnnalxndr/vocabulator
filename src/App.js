import React from 'react';
import './App.css';

import WordSearch from './components/WordSearch';

function App() {
  return (
    <div className="App">
      <header>
        <h2>Vocabulator</h2>
        <h4>Learn new words. Refresh old ones. Expand your vocabulary.</h4>
        <WordSearch />
      </header>
    </div>
  );
}

export default App;
