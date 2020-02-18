import React, { useState } from 'react';

const WordSearch = () => {
    const [searchInput, setSearchInput] = useState('');

    return (
        <React.Fragment>
            <input
                type="text"
                placeholder="Search for a word"
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <br/>
            <button type="button">Define</button>
        </React.Fragment>
    );
};

export default WordSearch;
