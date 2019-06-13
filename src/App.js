import React from 'react';
import './App.css';
import AutoCompleteText from './AutoCompleteText';
import SearchBox2 from './SearchBox2';
import CamNames from './CamNames';

function App() {
  return (
    <div className="App">
      <div className="App-Component">
        <div className="App-Component">
          {/* <HideableText text="Dynamic Text" /> */}
          <p>Your rack:</p>
          <br></br>
          <AutoCompleteText items={CamNames} />
          <br></br>
          <p>Pieces Required :</p>
          <br></br>
          <SearchBox2 items={CamNames}/>
        </div>
      </div>
    </div>
  );
}

export default App;
