import React, { useState } from 'react';

import WordSearch from './search/WordSearch';
import Test from './test/Test';

const SEARCH = 'search';
const TEST = 'test';

const menuOptions = [
  {
    value: SEARCH,
    label: 'New Word'
  },
  {
    value: TEST,
    label: 'Test Yourself'
  }
]

export default function Navigation({ theme, setTheme }) {
  const [selectedMenu, setSelectedMenu] = useState(SEARCH);
  let content = null;
  switch(selectedMenu) {
    case SEARCH:
      content = <WordSearch />;
      break;
    case TEST:
      content = <Test />
      break;
    default:
      content = <WordSearch />;
      break;
  }
  return (
    <React.Fragment>
      <nav className="Navigation-tabs" aria-label="Main navigation">
        {menuOptions.map(option => (
          <button
            key={option.value}
            type="button"
            className="Navigation-tab"
            aria-pressed={selectedMenu === option.value}
            onClick={() => setSelectedMenu(option.value)}
          >
            {option.label}
          </button>
        ))}
      </nav>
      {content}
    </React.Fragment>
  )
};
