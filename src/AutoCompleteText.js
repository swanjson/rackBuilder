import React from 'react';
import './AutoCompleteText.css';
import { VirtualTimeScheduler } from 'rxjs';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

export default class AutoCompleteText extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedItems: [],
            suggestions: [],
            text: '',
        };
    }

    getItemString = (item) => {
        return `${item.manufacturer} ${item.model} ${item.size} ${item.color}`;
    }

    onTextChanged = (e) => {
        const { items } = this.props;
        const value = e.target.value;
        let suggestions = [];
        if( value > "")
            suggestions = items.filter(item => {
                const itemText = this.getItemString(item);
                const lc = itemText.toLowerCase();
                const filter = value.toLowerCase();
                return lc.includes(filter)
        })
        this.setState(() => ({suggestions, text: value}));
    }

    suggestionSelected(value) {
        this.setState(() => ({
            text: "",
            suggestions: [],
            selectedItems: this.state.selectedItems.concat([value]),
        }));
    }

    deleteItem = (itemId) => {
        alert(`deleting item: ${itemId}`);
    }

    createNewList(){
        const { selectedItems } = this.state;
        if(selectedItems.length === 0){
            return null;
        }
        return(
        <ul className="ul-2">
            {selectedItems.map((value) => {
                return <li key={value.id}>
                    Manufacturer: {value.manufacturer}, Color: {value.color}
                    <button onClick={() => this.deleteItem(value.id)}>Delete</button>
                </li>
            })}
        </ul>
        );
    }

    renderSuggestions() {
        const { suggestions } = this.state;
        if(suggestions.length === 0){
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{this.getItemString(item)}</li>)}
            </ul>
        );
    }

    render() {
        const { text } = this.state;
        return(
                <div className="AutoCompleteText">
                    <input value={text} onChange={this.onTextChanged} type="text" />
                    {this.renderSuggestions()}
                    {this.createNewList()}
                </div>
        )
    }
}
