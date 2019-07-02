import React from 'react';
import './App.css';
import AutocompleteSearchFill from './AutoCompleteSearchFill'
import CamNames from './CamNames';
import CamObjects from './CamObjects';
import YellowHighlightAddSearch from './YellowHighlightAddSearch';
import HaveRackBar from './HaveRackBar';

function App() {
  return (
    <div className="App">
      <div className="App-Component">
        <div className="App-Component">
          {/* <HideableText text="Dynamic Text" /> */}
          <p>Your rack:</p>
          <br></br>
          <HaveRackBar items={CamObjects} />
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
