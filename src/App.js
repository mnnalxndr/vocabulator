import React, { useState, useEffect } from 'react';
import './App.css';

import Navigation from './components/Navigation';

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem('theme') || 'light';
    } catch (e) {
      return 'light';
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
      <header>
        <h2>Vocabulator</h2>
        <h4>Learn new words. Refresh old ones. Expand your vocabulary.</h4>
      </header>
      <Navigation theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
