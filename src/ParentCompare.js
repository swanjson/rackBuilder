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

  plusOneCam = (camId) => {
    this.setState((prevState) => {
      const yourRack = prevState.yourRack;
    //cycle through and find this right entry and increment by one
      yourRack.forEach(item => {
        if (item.id === camId)
          yourRack[item].quantity += 1;
      });


      return {
        yourRack
      };
    });
  }


  addCamToRack = (camId) => {
    this.setState((prevState) => {
      const yourRack = prevState.yourRack;
      //add if then whether or not the camId is already in the array
      yourRack.push({id: camId, quantity: 1});
      return {
        yourRack
      };
    });
  }
  //TODO: Make sure ^this^ is appending those two values to the state array 

  render() {
    return(
    <div>
      <HaveRackBar items={CamObjects} add={this.addCamToRack} rack={this.state.yourRack}/>
    </div>
    );
  }
}





