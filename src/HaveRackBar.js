import React from 'react';
import './HaveRackBar.css';


export default class HaveRackBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hrbSelectedItems: [],
            hrbSuggestions: [],
            hrbText: '',
            hrbQuantity: 0,
        };
    
    }

    getItemString = (item) => {
        return `${item.manufacturer} ${item.model} ${item.size} ${item.color}`;
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

    quanityHaveChanged = (e) => {
        const value = e.target.value;
        this.setState(() => ({hrbQuantity: value}));
    }

    suggestionSelected(value) {
        this.setState(() => ({
            text: "",
            hrbSuggestions: [],
            hrbSelectedItems: this.state.hrbSelectedItems.concat([value]),
        }));
    }

    deleteItem = () => {
        this.setState((state) => ({
            hrbQuantity: (state.hrbQuantity - 1)
        }));
    }

    addItem = () => {
        this.setState((state) => ({
            hrbQuantity: state.hrbQuantity + 1
        }));
    }

    createNewList(){
        const { hrbSelectedItems } = this.state;
        const { hrbQuantity } = this.state;
        if(hrbSelectedItems.length === 0){
            return null;
        }
        return(
        <ul className="ul-2">
            {hrbSelectedItems.map((value) => {
                return <li key={value.id}>
                    {value.manufacturer} {value.model} {value.size} {value.color}
                    <button className="addButton" value={hrbQuantity} onClick={() => this.addItem(value.id)}>+</button>
                    <input className="quantityTextBox" value={hrbQuantity} onChange={this.quanityHaveChanged} type="text" />
                    <button className="deleteButton" value={hrbQuantity} onClick={() => this.deleteItem(value.id)}>-</button>
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
