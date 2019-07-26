import React, { Component } from 'react';
import CamObjects from './CamObjects';
import HaveRackBar from './HaveRackBar';
import RackNeededBar from './RackNeededBar';

export default class ParentCompare extends Component {
  constructor(props) {
    super(props);
    this.state = {
    yourRack: [],
    rackNeeded: []
    };
  }

  addCamToHaveRack = (camId) => {
    this.setState((prevState) => {
      const yourRack = prevState.yourRack;
      const gearBool = yourRack.some(e => e.id === camId);
      if(gearBool){
        for (var j = 0; j < yourRack.length; j++)
          if (yourRack[j].id === camId)
            yourRack[j].quantity += 1;
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
      const gearBool = yourRack.some(e => e.id === camId);
      if(gearBool){
        for (var j = 0; j < yourRack.length; j++)
          if (yourRack[j].id === camId)
            if ((yourRack[j].quantity) === 1){
              alert("Just deleted the cam from the list!") //change to which cam or an "are you sure?" dialogue
              yourRack.splice(j,1)
            }
            else {
              yourRack[j].quantity -= 1;
            }
        }
      return {
        yourRack
      };
    });
  }


  addCamToRackNeeded = (camId) => {
    this.setState((prevState) => {
      const rackNeeded = prevState.rackNeeded;
      const gearBool = rackNeeded.some(e => e.id === camId);
      if(gearBool){
        for (var j = 0; j < rackNeeded.length; j++)
          if (rackNeeded[j].id === camId)
            rackNeeded[j].quantity += 1;
         }
      else {
        rackNeeded.push({id: camId, quantity: 1});
      }
      return {
        rackNeeded
      };
    });
  }


  removeCamFromRackNeeded = (camId) => {
    this.setState((prevState) => {
      const rackNeeded = prevState.rackNeeded;
      const gearBool = rackNeeded.some(e => e.id === camId);
      if(gearBool){
        for (var j = 0; j < rackNeeded.length; j++)
          if (rackNeeded[j].id === camId)
            if ((rackNeeded[j].quantity) === 1){
              alert("Just deleted the cam from the list!") //change to which cam or an "are you sure?" dialogue
              rackNeeded.splice(j,1)
            }
            else {
              rackNeeded[j].quantity -= 1;
            }
        }
      return {
        rackNeeded
      };
    });
  }

  render() {
    return(
    <div>
      <p>Your rack:</p>
      <br></br>
      <HaveRackBar items={CamObjects} add2Have={this.addCamToHaveRack} rackHave={this.state.yourRack} minusHave={this.removeCamFromHaveRack}/>
      <p>Required Rack:</p>
      <br></br>
      <RackNeededBar items={CamObjects} addNeed={this.addCamToRackNeeded} rackNeed={this.state.rackNeeded} minusNeed={this.removeCamFromRackNeeded}/>
    </div>
    );
  }
}





