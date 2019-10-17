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
      if(gearBool){
          if (gearBool.id === camId){
            if ((gearBool.quantity) === 1){
              alert("Just deleted the cam from the list!") //change to which cam or an "are you sure?" dialogue
              yourRack.splice(foundIndex,1)
            }
            else {
              gearBool.quantity = gearBool.quantity - 1;
            }
          }
        }
      return {yourRack};
    });
    this.bringBorrowCompare(camId);
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
    this.bringBorrowCompare(camId);
  }

/*FOR RACK NEEDED*/
  removeCamFromRackNeeded = (camId) => {
    this.setState((prevState) => {
      const rackNeeded = prevState.rackNeeded;
      const gearBool = rackNeeded.find(e => e.id === camId);
      const foundIndex = rackNeeded.indexOf(gearBool);
      if(gearBool){
          if (gearBool.id === camId)
            if ((gearBool.quantity) === 1){
              alert("Just deleted the cam from the list!") //change to which cam or an "are you sure?" dialogue
              rackNeeded.splice(foundIndex,1)
            }
            else {
              gearBool.quantity -= 1;
            }
        }
      return {rackNeeded};
    });
    this.bringBorrowCompare(camId);
  }


  //FIGURE OUT EMPTY ARRAY CASES
  bringBorrowCompare = (camId) => { //if called from all change functions that must mean there's at least one in the have rack.
    this.setState((prevState) => {
      const bringRack = prevState.bringRack;
      const borrowRack = prevState.borrowRack;
      const rackNeeded = prevState.rackNeeded;
      const yourRack = prevState.yourRack;
      const inNeed = rackNeeded.find(e => e.id === camId);
      const inHave = yourRack.find(e => e.id === camId);
      if (inNeed){ //It is in needed. I need to see the quantity in needed and compare to how many I have and reset it everytime.
        if(!inHave){
          const borrowBool = borrowRack.find(e => e.id === camId);
          const bringBool = bringRack.find(e => e.id === camId);
          const brBIndex = bringRack.indexOf(bringBool);
          if(bringBool)
            if (bringBool.id === camId)
              bringRack.splice(brBIndex,1);
          if(borrowBool)
            borrowBool.quantity = inNeed.quantity;
          else
            borrowRack.push({id: camId, quantity: inNeed.quantity});
        }
        else if (inNeed.quantity >= inHave.quantity){
          const needHaveDifference = (inNeed.quantity - inHave.quantity);
          if (needHaveDifference > 0){
            const gearBool = bringRack.find(e => e.id === camId);
            if(gearBool)
              gearBool.quantity = inHave.quantity;
            else
              bringRack.push({id: camId, quantity: inHave.quantity});
              //Change borrow rack
              const borrowBool = borrowRack.find(e => e.id === camId);
              if(borrowBool)
                borrowBool.quantity = needHaveDifference;
              else
                borrowRack.push({id: camId, quantity: needHaveDifference});
          }      
          else if (needHaveDifference < 0){
            console.log('does this even trigger?')
            const gearBool = bringRack.find(e => e.id === camId);
            const gearBoolIndex = bringRack.indexOf(gearBool);
            if(gearBool){
              if (gearBool.id === camId)
                bringRack.splice(gearBoolIndex,1);
            }
          }
          else if( needHaveDifference === 0){
            const gearBool = bringRack.find(e => e.id === camId);
            if(gearBool)
              gearBool.quantity = inHave.quantity;
            else
              bringRack.push({id: camId, quantity: inHave.quantity});
            const borrowBool = borrowRack.find(e => e.id === camId);
            const bbIndex = borrowRack.indexOf(borrowBool);
            if(borrowBool){
                if (borrowBool.id === camId)
                  if (((borrowBool.quantity) === 1) || ((borrowBool.quantity) === 0)){
                    borrowRack.splice(bbIndex,1);
                  }
                }
          }
        }
        else/*(inNeed.quantity < inHave.quantity)*/{
          const gearBool = bringRack.find(e => e.id === camId);
            if(gearBool)
              gearBool.quantity = inNeed.quantity;
            else
              bringRack.push({id: camId, quantity: inNeed.quantity});
          const borrowBool = borrowRack.find(e => e.id === camId);
          const bbIndex = borrowRack.indexOf(borrowBool);
          if(borrowBool){
              if (borrowBool.id === camId)
                if (((borrowBool.quantity) === 1) || ((borrowBool.quantity) === 0)){
                  borrowRack.splice(bbIndex,1)
                }
          }
        }
      }
      else { 
        //DO NOTHING BECAUSE IT'S JUST BUILDING YOUR RACK AND IT'S NOT NEEDED YET
      }
      return {bringRack, borrowRack};
    })
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





