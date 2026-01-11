import React from 'react';



const Definitions = (props) => {
  const { searchTerm, definitionList } = props;
  
  return (
    <div>
      {searchTerm}
      {definitionList ?
      definitionList.map(entry => (
        <div key={entry.id} className="definition">
          <div>{entry.definition}</div>
          <div>{entry.example}</div>
        </div>
      )) : null}
    </div>
  )
};

export default Definitions;