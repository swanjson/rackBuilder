import React, { Component } from 'react';
import HaveRackBar from './HaveRackBar';
import CamObjects from './CamObjects';

export default class ParentCompare extends Component {
  constructor(props) {
    super(props);
    this.state = {
    yourRack: [/*{id: null, quantity: null}*/]
    };
  }
/* Redundant I can just use the below add
  plusOneCam = (camId) => {
    this.setState((prevState) => {
      const yourRack = prevState.yourRack;
      for (var i=0; i < yourRack.length; i++){
        if(camId === i){
          yourRack[i].quantity += 1;
        }
      }
      return {yourRack}
    });
  }
*/

  addCamToRack = (camId) => {
    this.setState((prevState) => {
      const yourRack = prevState.yourRack;
      if (yourRack.some(e => e.id === camId)) {
        for (var i=0; i < yourRack.length; i++){
          if(camId === i){
          yourRack[i].quantity += 1;
         }
        }
      }
      else {
        yourRack.push({id: camId, quantity: 1});
      }
      return {
        yourRack
      };
    });
  }

  removeCamFromRack = (camId) => {
    this.setState((prevState) => {
      const yourRack = prevState.yourRack;
      if (yourRack.some(e => e.id === camId)) {
        for (var i=0; i < yourRack.length; i++){
          if(camId === i){
            yourRack[i].quantity -= 1;
          }
          else if (camId === i && (yourRack[i].quantity) === 1){
            yourRack.splice(i,1)
          }
        }
      }
      return {
        yourRack
      };
    });
  }

  render() {
    return(
    <div>
      <HaveRackBar items={CamObjects} add={this.addCamToRack} rack={this.state.yourRack} plus={this.plusOneCam} minus={this.removeCamFromRack}/>
    </div>
    );
  }
}





