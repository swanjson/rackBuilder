import React, { Component } from 'react';
import CamObjects from './CamObjects';
import HaveRackBar from './HaveRackBar';
import RackNeededBar from './RackNeededBar';
import similarCamData from './CamManip';
import './ParentCompare.css'


console.log(similarCamData[0].sim2Ids);
//console.log(similarCamData[122].sim2Ids);

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
      const gearBool = yourRack.find(e => e.id === camId);
      if(gearBool)
        gearBool.quantity += 1;
      else
        yourRack.push({id: camId, quantity: 1});
      return{yourRack};
    });
    this.addToHaveCompare(camId);
  }

/*FOR HAVE RACK*/
  removeCamFromHaveRack = (camId) => {
    this.setState((prevState) => {
      const yourRack = prevState.yourRack;
      const gearBool = yourRack.find(e => e.id === camId);
      if(gearBool){
        for (var j = 0; j < yourRack.length; j++)
          if (gearBool.id === camId)
            if ((gearBool.quantity) === 1){
              alert("Just deleted the cam from the list!") //change to which cam or an "are you sure?" dialogue
              yourRack.splice(j,1)
            }
            else {
              gearBool.quantity -= 1;
            }
        }
      return {yourRack};
    });
  }

/*FOR RACK NEEDED*/
  addCamToRackNeeded = (camId) => {
    this.setState((prevState) => {
      const rackNeeded = prevState.rackNeeded;
      const gearBool = rackNeeded.find(e => e.id === camId);
      if(gearBool)
        gearBool.quantity += 1;
      else
        rackNeeded.push({id: camId, quantity: 1});
      return {rackNeeded};
    });
    //this.bringBorrowSearch(camId);
  }

/*FOR RACK NEEDED*/
  removeCamFromRackNeeded = (camId) => {
    this.setState((prevState) => {
      const rackNeeded = prevState.rackNeeded;
      const gearBool = rackNeeded.some(e => e.id === camId);
      if(gearBool){
        for (var j = 0; j < rackNeeded.length; j++)
          if (gearBool.id === camId)
            if ((gearBool.quantity) === 1){
              alert("Just deleted the cam from the list!") //change to which cam or an "are you sure?" dialogue
              rackNeeded.splice(j,1)
            }
            else {
              gearBool.quantity -= 1;
            }
        }
      return {rackNeeded};
    });
  }


  getItemString = (item) => {
    return `${item.manufacturer} ${item.model} ${item.size} ${item.color}`;
  }

  addToHaveCompare = (camId) => { //if called from add function that must mean there's at least one in the have rack.
    this.setState((prevState) => {
      const bringRack = prevState.bringRack;
      const borrowRack = prevState.bringRack;
      const rackNeeded = prevState.rackNeeded;
      const yourRack = prevState.yourRack;
      const inNeed = rackNeeded.find(e => e.id === camId);
      const inHave = yourRack.find(e => e.id === camId);
      console.log(inNeed);
      //console.log(inHave);
      if (inNeed){ //It is in needed. I need to see the quantity in needed and compare to how many I have and reset it everytime.
        if (inNeed.quantity >= inHave.quantity){
          const needHaveDifference = (inNeed.quantity - inHave.quantity);
          if (needHaveDifference > 0){
            console.log(needHaveDifference);
            bringRack.push({id: camId, quantity: inHave.quantity});
            borrowRack.push({id: camId, quantity: needHaveDifference});
            
          }
          else if( needHaveDifference === 0){
            bringRack.push({id: camId, quantity: inHave.quantity});
          }
        }
        else/*(inNeed.quantity < inHave.quantity)*/{
          bringRack.push({id: camId, quantity: inNeed.quantity});
        }
        console.log(bringRack);
      }
      else { 
        //DO NOTHING BECAUSE IT'S JUST BUILDING YOUR RACK AND IT'S NOT NEEDED YET
      }
      return {bringRack, borrowRack};
    })
  }




/*
  bringBorrowSearch = (camId) => {
    const { bringRack } = this.state;
    const { borrowRack } = this.state;
    this.setState((prevState) => {
      //const rackNeeded = prevState.rackNeeded;
      const bringRack = prevState.bringRack;
      const borrowRack = prevState.bringRack;
      const yourRack = prevState.yourRack;
      const foundInHaveRack = yourRack.find(e => e.id === camId);
      if (foundInHaveRack){
        const foundInBringRack = bringRack.find(e => e.id === camId);
        if (foundInBringRack){
          for (var j = 0; j < bringRack.length; j++){
            if (bringRack[j].id === camId){
              bringRack[j].quantity += 1;
            }
          }
        }
        else {
          bringRack.push({id: camId, quantity: 1});
        }
      }
      else {
        borrowRack.push({id: camId, quantity: 1});
      }
    })
    console.log(bringRack);
    console.log(borrowRack);
  }
*/


  createNewBringList(){
    if(this.state.bringRack.length === 0){
        return null;
    }
    return(
    <ul className="bring-ul-2">
        {this.state.bringRack.map((value) => {
            return <li key={"value.id.toString() + a"}>
                {this.getItemString(CamObjects[value.id])}
                <input className="bringQuantityTextBox" value={value.quantity} type="text" />
            </li>
        })}
    </ul>
    );
  }

  createNewBorrowList(){
    if(this.state.borrowRack.length === 0){
        return null;
    }
    return(
    <ul className="borrow-ul-2">
        {this.state.borrowRack.map((value) => {
            return <li key={"value.id.toString() + b"}>
                {this.getItemString(CamObjects[value.id])}
                <input className="borrowQuantityTextBox" value={value.quantity} type="text" />
            </li>
        })}
    </ul>
    );
  }


  generateLists = () => {
    this.createNewBorrowList();
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
      <p>Bring:</p>
      <br></br>
      {this.createNewBringList()}
      <p>Borrow/Buy:</p>
      {this.generateLists()}
      <br></br>

    </div>
    );
  }
}





