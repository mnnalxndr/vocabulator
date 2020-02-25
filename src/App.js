import React from 'react';
import './App.css';

import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <header>
        <h2>Vocabulator</h2>
        <h4>Learn new words. Refresh old ones. Expand your vocabulary.</h4>
      </header>
      <Navigation />
    </div>
  );
}

export default App;
