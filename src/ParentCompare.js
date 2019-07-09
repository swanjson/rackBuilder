import React, { Component } from 'react';
import HaveRackBar from './HaveRackBar';

export default class ParentCompare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yourRack: []

    };
  }

  addCam = (camId) => {
    this.setState((prevState) => {
      const yourRack = prevState.yourRack;
      const camItem = yourRack.filter(item => item.id === camId);
      if (camItem) {
        camItem.quantity += 1;
      } else {
        yourRack.push({id: camId, quantity: 1});
      }
      return {
        yourRack
      };
    });
  }

  render(props)  {
    return <div>
      <HaveRackBar add={this.addCam} rack={this.state.yourRack} />
    </div>
  }
}





