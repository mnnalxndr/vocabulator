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
      <header style={{ position: 'relative' }}>
        <div>
          <h2>Vocabulator</h2>
          <h4>Learn new words. Refresh old ones. Expand your vocabulary.</h4>
        </div>
        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '8px 16px',
            backgroundColor: 'var(--button-bg)',
            color: 'var(--button-text)',
            border: '1px solid var(--card-border)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>
      <Navigation theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
