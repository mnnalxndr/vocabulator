import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h2>Vocabulator</h2>
        <h4>Learn new words. Refrash old ones. Expand your vocabulary.</h4>
      </header>
      <div>
        <input type="text" placeholder="Search for a word" />
        <br/>
        <button type="button">Define</button>
      </div>
    </div>
  );
}

export default App;
