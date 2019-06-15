import React from 'react';
import './YellowHighlightAddSearch.css';

export default class YellowHighlightAddSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedItems: [],
            suggestions: [],
            text: '',
        };
    }

    onTextChanged = (e) => {
        const { items } = this.props;
        const value = e.target.value;
        let suggestions = [];
        if( value > "")
            suggestions = items.filter(item => {
                const lc = item.toLowerCase();
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

    createNewList(){
        const { selectedItems } = this.state;
        if(selectedItems.length === 0){
            return null;
        }
        return(
        <ul className="ul-3">
            {selectedItems.map((value) => <li>{value}</li>)} 
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
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }

    render() {
        const { text } = this.state;
        return(
                <div className="YellowHighlightAddSearch">
                    <input value={text} onChange={this.onTextChanged} type="text" />
                    {this.renderSuggestions()}
                    {this.createNewList()}
                </div>
        )
    }
}
