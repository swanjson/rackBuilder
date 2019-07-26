import React from 'react';
import './App.css';
import AutocompleteSearchFill from './AutoCompleteSearchFill'
import CamNames from './CamNames';
import CamObjects from './CamObjects';
import YellowHighlightAddSearch from './YellowHighlightAddSearch';
import ParentCompare from './ParentCompare';

function App() {
  return (
    <div className="App">
      <div className="App-Component">
        <div className="App-Component">
          <p>Your rack:</p>
          <br></br>
          <ParentCompare items={CamObjects}/>
          <br></br>
          <p>Pieces Required :</p>
          <br></br>
          <YellowHighlightAddSearch items={CamNames}/>
          <p>Pieces To Get :</p>
          <br></br>
          <AutocompleteSearchFill items={CamNames}/>
        </div>
      </div>
    </div>
  );
}

export default App;
