import React from 'react';
import './App.css';
import HideableText from './HideableText';
import AutoCompleteText from './AutoCompleteText';
import CamNames from './CamNames';

function App() {
  return (
    <div className="App">
      <div className="App-Component">
        <div className="App-Component">
          {/* <HideableText text="Dynamic Text" /> */}
          <p>Your rack:</p>
          <br></br>
          <AutoCompleteText items={CamNames}/>
          <br></br>
          <p>Pieces Required:</p>
          <br></br>
          <AutoCompleteText items={CamNames}/>
        </div>
      </div>
    </div>
  );
}

export default App;
