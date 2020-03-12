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

  getItemString = (item) => {
    return `${item.manufacturer} ${item.model} ${item.size} ${item.color}`;
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
    this.bringBorrowCompare(camId);
  }

/*FOR HAVE RACK*/
  removeCamFromHaveRack = (camId) => {
    this.setState((prevState) => {
      const yourRack = prevState.yourRack;
      const gearBool = yourRack.find(e => e.id === camId);
      const foundIndex = yourRack.indexOf(gearBool);
      if(gearBool && gearBool.id === camId && gearBool.quantity === 1){
        alert("Just deleted the cam from the list!"); //change to which cam or an "are you sure?" dialogue
        yourRack.splice(foundIndex,1);
      }
      else
        gearBool.quantity = gearBool.quantity - 1;
      return {yourRack};
    });
    this.bringBorrowCompare(camId);
  }

/*FOR RACK NEEDED*/
  addCamToRackNeeded = (camId) => {
    this.setState((prevState) => {
      const rackNeeded = [...prevState.rackNeeded] //spreading an array (triple dot operator)
      const gearBool = rackNeeded.find(e => e.id === camId);
      if(gearBool)
        gearBool.quantity += 1;
      else
        rackNeeded.push({id: camId, quantity: 1});
      return {rackNeeded};
    });
    //this.bringBorrowSearch(camId);
    this.bringBorrowCompare(camId);
  }

/*FOR RACK NEEDED*/
  removeCamFromRackNeeded = (camId) => {
    this.setState((prevState) => {
      const rackNeeded = prevState.rackNeeded;
      const gearBool = rackNeeded.find(e => e.id === camId);
      const foundIndex = rackNeeded.indexOf(gearBool);
      if(gearBool && gearBool.id === camId && gearBool.quantity === 1){
        alert("Just deleted the cam from the list!") //change to which cam or an "are you sure?" dialogue
        rackNeeded.splice(foundIndex,1)
      }
      else
        gearBool.quantity -= 1;
      return {rackNeeded};
    });
    this.bringBorrowCompare(camId);
  }


  bringBorrowCompare = (camId) => { //if called from all change functions that must mean there's at least one in the have rack.
    this.setState((prevState) => { 
      const { // Better to do this object destructuring this way instead of inline for communication to humans
        bringRack,
        borrowRack,
        rackNeeded,
        yourRack
      } = prevState;
      
      // is there a way to see if these declarations are impossible? or is that for a test?
      const inNeed = rackNeeded.find(e => e.id === camId) || {quantity: 0}; //short circuiting to initialize
      const inHave = yourRack.find(e => e.id === camId) || {quantity: 0};
      const bringBool = bringRack.find(e => e.id === camId);
      const borrowBool = borrowRack.find(e => e.id === camId);
      const brBIndex = bringRack.indexOf(bringBool);
      const bbIndex = borrowRack.indexOf(borrowBool);
      const needHaveDifference = (inNeed.quantity - inHave.quantity);

      if (inNeed){ //It is in needed. I need to see the quantity in needed and compare to how many I have and reset it everytime.
        if(!inHave){
          if(bringBool && bringBool.id === camId)
            this.spliceFromRack(bringRack,brBIndex); //REMOVES CAM FROM BRING RACK IF HAVE RACK QUANTITY GOES TO ZERO
          if(borrowBool)
            this.setQuantityEqualTo(borrowBool,inNeed);
          else
            this.pushToRack(borrowRack,camId,inNeed);
        }
        else if (inNeed.quantity >= inHave.quantity){   
          if (needHaveDifference > 0){
            if(bringBool)
              this.setQuantityEqualTo(bringBool,inHave);
            else
              this.pushToRack(bringRack,camId,inHave);
              if(borrowBool)
                borrowBool.quantity = needHaveDifference;
              else
                borrowRack.push({id: camId, quantity: needHaveDifference});
          }      
          else if (needHaveDifference < 0 && bringBool && bringBool.id === camId)
            this.spliceFromRack(bringRack,brBIndex);
          else if(needHaveDifference === 0){ /* IF YOURRACK and RACKNEEDED ARE THE SAME*/
            if(bringBool){
            this.setQuantityEqualTo(bringBool,inHave);
            }
            else
              this.pushToRack(bringRack,camId,inHave);
            if(borrowBool && borrowBool.id === camId && borrowBool.quantity === 1)
              this.spliceFromRack(borrowRack,bbIndex);
          }
        }
        else{ /*(inNeed.quantity < inHave.quantity)*/
          if(bringBool)
            this.setQuantityEqualTo(bringBool,inNeed);
          else
            this.pushToRack(bringRack,camId,inNeed);
          if(borrowBool && borrowBool.id === camId && borrowBool.quantity === 1)
            this.spliceFromRack(borrowRack,bbIndex);
        }  
      }
      else { 
        if(borrowBool && borrowBool.quantity === 1) //REMOVES CAM FROM BORROW WHEN REMOVED FROM NEED RACK
          this.spliceFromRack(borrowRack,bbIndex);
        if(bringBool && (bringBool.quantity === 1)) //REMOVES CAM FROM BRING WHEN REMOVED FROM NEED RACK
          this.spliceFromRack(bringRack,brBIndex);
      }
      return {bringRack, borrowRack};
      })
  }

  setQuantityEqualTo(rack1,rack2){
    rack1.quantity = rack2.quantity;
  }

  pushToRack(rack,id,rack2){
    rack.push({id: id, quantity: rack2.quantity});
  }

  spliceFromRack(rack,index){
    rack.splice(index,1);
  }

  createNewBringList(){
    if(this.state.bringRack.length === 0){
        return null;
    }
    return(
    <ul className="bring-ul-2">
        {this.state.bringRack.map((value) => {
            return <li key={value.id.toString()}>
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
            return <li key={value.id.toString()}>
                {this.getItemString(CamObjects[value.id])}
                <input className="borrowQuantityTextBox" value={value.quantity} type="text" />
            </li>
        })}
    </ul>
    );
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
      {this.createNewBorrowList()}
      <br></br>

    </div>
    );
  }
}





