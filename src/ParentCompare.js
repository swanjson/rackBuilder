import React, { Component } from 'react';
import CamObjects from './CamObjects';
import HaveRackBar from './HaveRackBar';
import RackNeededBar from './RackNeededBar';

export default class ParentCompare extends Component {
  constructor(props) {
    super(props);
    this.state = {
    yourRack: [],
    rackNeeded: [],
    bringRack: [],
    borrowRack: [],
    };
  }

/*FOR HAVE RACK*/
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

/*FOR HAVE RACK*/
  removeCamFromHaveRack = (camId) => {
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

/*FOR RACK NEEDED*/
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

/*FOR RACK NEEDED*/
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


  getItemString = (item) => {
    return `${item.manufacturer} ${item.model} ${item.size} ${item.color}`;
  }
/*
  compareRackArrays = () => {
    this.setState((prevState) => { 
      const rackNeeded = prevState.rackNeeded;
      const yourRack = prevState.yourRack;
      const bringRack = prevState.bringRack;
      for (var i = 0; i < rackNeeded.length; i++){
        for (var j = 0; j < yourRack.length; j++){}
          if (yourRack[i].id === rackNeeded[j].id){
            if (yourRack[i].quantity === rackNeeded[j].quantity){
              bringRack.push({id: yourRack[i].id, quantity: yourRack[i].quantity});
            }
          }
        }
      }
    )}
  



  
  createBringList = () => {
    const { bringRack }= this.state;
    if( this.bringRack.length === 0){
      return null;
    }
    return(
    <ul className="bring-ul-2">
      {this.props.bringRack.map((value) => {
        return <li key={value.id.toString()}>
          {this.getItemString(CamObjects[value.id])}
        </li>
      })}
    </ul>
    )
  }

  createBorrowList = () => {
    if( this.props.borrowRack.length === 0){
      return null;
    }
    return(
    <ul className="borrow-ul-2">
      {this.props.borrowRack.map((value) => {
        return <li key={value.id.toString()}>
          {this.getItemString(CamObjects[value.id])}
        </li>
      })}
    </ul>
    )
  }
  */

  render() {
    return(
    <div>
      <p>Your rack:</p>
      <br></br>
      <HaveRackBar items={CamObjects} add2Have={this.addCamToHaveRack} rackHave={this.state.yourRack} minusHave={this.removeCamFromHaveRack}/>
      <p>Required Rack:</p>
      <br></br>
      <RackNeededBar items={CamObjects} addNeed={this.addCamToRackNeeded} rackNeed={this.state.rackNeeded} minusNeed={this.removeCamFromRackNeeded}/>
      {/*this.compareRackArrays()*/}
      <p>Bring:</p>
      <br></br>
      {/*this.createBringList()*/}
      <p>Borrow/Buy:</p>
      {/*this.createBringList()*/}
      <br></br>

    </div>
    );
  }
}





