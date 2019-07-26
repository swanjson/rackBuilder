import React, { Component } from 'react';
import HaveRackBar from './HaveRackBar';
import CamObjects from './CamObjects';

export default class ParentCompare extends Component {
  constructor(props) {
    super(props);
    this.state = {
    yourRack: []
    };
  }

  addCamToRack = (camId) => {
    this.setState((prevState) => {
      const yourRack = prevState.yourRack;
      const gearBool = yourRack.some(e => e.id === camId);
      if(gearBool){
        for (var j = 0; j < yourRack.length; j++)
          if (yourRack[j].id === camId)
            yourRack[j].quantity += 1;
            //console.log("index: "+i,"quantity: "+yourRack[i].quantity)
         }
      else {
        yourRack.push({id: camId, quantity: 1});
      }
      console.log(yourRack)
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

  render() {
    return(
    <div>
      <HaveRackBar items={CamObjects} add={this.addCamToRack} rack={this.state.yourRack} plus={this.plusOneCam} minus={this.removeCamFromRack}/>
    </div>
    );
  }
}





