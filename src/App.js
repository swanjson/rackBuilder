import React from 'react';
import './App.css';
import CamObjects from './CamObjects';
import ParentCompare from './ParentCompare';

function App() {
  return (
    <div className="App">
      <div className="App-Component">
        <div className="App-Component">
          <ParentCompare items={CamObjects}/>
        </div>
      </div>
    </div>
  );
}

export default App;
