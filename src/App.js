import React, { useState, useEffect } from 'react';
import './App.css';

import Navigation from './components/Navigation';

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem('theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('theme', theme);
    } catch (e) {}
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="App">
      <header className="App-header-inner">
        <div className="App-header-text">
          <h2>Vocabulator</h2>
          <h4>Learn new words. Refresh old ones. Expand your vocabulary.</h4>
        </div>
        <button
          type="button"
          className="App-theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>
      <Navigation theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
