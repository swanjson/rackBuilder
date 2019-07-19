import React from 'react';
import './HaveRackBar.css';
import CamObjects from './CamObjects';

export default class HaveRackBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hrbSelectedItems: [],
            hrbSuggestions: [],
            hrbText: '',
            hrbQuantity: 0,
        };
        // PASSED FROM PARENT COMPARE <HaveRackBar add={this.addCam} rack={this.state.yourRack} />
    }
    onTextChanged = (e) => {
        const { items } = this.props;
        const value = e.target.value;
        let hrbSuggestions = [];
        if( value > "")
            hrbSuggestions = items.filter(item => {
                const itemText = this.getItemString(item);
                const lc = itemText.toLowerCase();
                const filter = value.toLowerCase();
                return lc.includes(filter)
        })
        this.setState(() => ({hrbSuggestions, hrbText: value}));
    }

    onNumberChanged = (value) => {
        this.setState(() =>
            //do another loop and search through and change the quantity to whatever was entered
            console.log(value.id, value.quantity)
        )
    }

    getItemString = (item) => {
        return `${item.manufacturer} ${item.model} ${item.size} ${item.color}`;
    }

    createNewList(){
        if(this.props.rack.length === 0){
            return null;
        }
        return(
        <ul className="ul-2">
            {this.props.rack.map((value) => {
                return <li key={value.id}>
                    {this.getItemString(CamObjects[value.id])}
                    <input className="quantityTextBox" value={value.quantity} onChange={this.onNumberChanged(value)} type="text" />
                </li>
            })}
        </ul>
        );
    }


    renderSuggestions() {
        const { hrbSuggestions } = this.state;
        if(hrbSuggestions.length === 0){
            return null;
        }
        return (
            <ul>
                {hrbSuggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{this.getItemString(item)}</li>)}
            </ul>
        );
    }
    /*
    Render changes:
    this.props.add(item.id)
    */

   suggestionSelected(value) {
    this.setState(() => ({
        text: "",
        hrbSuggestions: [],
    }))
    this.props.add(value.id);
}

    render() {
        const { hrbText } = this.state;
        return(
                <div className="HaveRackBar">
                    <input className="input1" value={hrbText} onChange={this.onTextChanged} type="text" />
                    {this.renderSuggestions()}
                    {this.createNewList()}
                </div>
        )
    }
}
