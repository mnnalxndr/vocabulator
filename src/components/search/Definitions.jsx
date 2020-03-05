import React, { useEffect, useState } from 'react';



const Definitions = (props) => {
  const { searchTerm } = props;
  const definitionList = [
    {definition: 'Def 1', example: "Ex 1"},
    {definition: 'Def 2', example: "Ex 2"},
    {definition: 'Def 3', example: "Ex 3"}
  ];
  // useEffect(() => {
  //   fetch(`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${searchTerm}?fields=definitions,examples&strictMatch=true`)
  //   .then(response => response.json())
  //   .then()
  // }, [searchTerm]);
  
  return (
    <div>
      {definitionList ?
      definitionList.map(entry => (
        <div className="definition">
          <div>{searchTerm}</div>
          <div>{entry.definition}</div>
          <div>{entry.example}</div>
        </div>
      )) : null}
    </div>
  )
};

export default Definitions;