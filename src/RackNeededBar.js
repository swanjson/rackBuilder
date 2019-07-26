import React from 'react';
import './RackNeededBar.css';
import CamObjects from './CamObjects';

export default class RackNeededBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rnbSuggestions: [],
            rnbText: '',
            rnbQuantity: 0,
        };
    }
    onTextChanged = (e) => {
        const { items } = this.props;
        const value = e.target.value;
        let rnbSuggestions = [];
        if( value > "")
            rnbSuggestions = items.filter(item => {
                const itemText = this.getItemString(item);
                const lc = itemText.toLowerCase();
                const filter = value.toLowerCase();
                return lc.includes(filter)
        })
        this.setState(() => ({rnbSuggestions, rnbText: value}));
    }

    onNumberChanged = (value) => {
        //this.setState(() =>

            //do another loop and search through and change the quantity to whatever was entered
            
        //)
        //console.log(value.id, value.quantity)
    }

    getItemString = (item) => {
        return `${item.manufacturer} ${item.model} ${item.size} ${item.color}`;
    }

    createNewList(){
        if(this.props.rackNeed.length === 0){
            return null;
        }
        return(
        <ul className="rnul-2">
            {this.props.rackNeed.map((value) => {
                return <li key={value.id.toString()}>
                    {this.getItemString(CamObjects[value.id])}
                    <button className="addButton" onClick={() => this.suggestionSelected(value)}>+</button>
                    <input className="rnquantityTextBox" value={value.quantity} onChange={this.onNumberChanged(value)} type="text" />
                    <button className="deleteButton" onClick={() => this.props.minusNeed(value.id)}>-</button>
                    {/*console.log("id:"+value.id,", quantity:"+value.quantity )*/}
                </li>
            })}
        </ul>
        );
    }


    renderSuggestions() {
        const { rnbSuggestions } = this.state;
        if(rnbSuggestions.length === 0){
            return null;
        }
        return (
            <ul>
                {rnbSuggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{this.getItemString(item)}</li>)}
            </ul>
        );
    }

   suggestionSelected(value) {
    this.setState(() => ({
        rnbSuggestions: [],
        rnbText: "",
    }))
    this.props.addNeed(value.id);
}

    render() {
        const { rnbText } = this.state;
        return(
                <div className="RackNeededBar">
                    <input className="input1" value={rnbText} onChange={this.onTextChanged} type="text" />
                    {this.renderSuggestions()}
                    {this.createNewList()}
                </div>
        )
    }
}
