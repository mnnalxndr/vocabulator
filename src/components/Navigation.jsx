import React, { useState } from 'react';

import WordSearch from './WordSearch';
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

export default function Navigation() {
  const [selectedMenu, setSelectedMenu] = useState(SEARCH);
  let content = null;
  switch(selectedMenu) {
    case SEARCH:
      content = <WordSearch />;
      break;
    case TEST:
      content = <Test />
      break;
    
  }
  return (
    <React.Fragment>
      {menuOptions.map(option => (
        <button
          type="button"
          selected={selectedMenu === option.value}
          onClick={() => setSelectedMenu(option.value)}
        >
          {option.label}
        </button>
      ))}
      {content}
    </React.Fragment>
  )
};
