import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

class AutocompleteNames extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: []
    };

        constructor(props) {
            super(props);

            this.state = {
                // The active selection's index
                activeSuggestion: 0,
                // The suggestions that match the user's input
                filteredSuggestions: [],
                // Whether or not the suggestion list is shown
                showSuggestions: false,
                // What the user has entered
                userInput: ""
            };
        }

        // Event fired when the input value is changed
        onChange = e => {
            const suggestions = this.props.getNames();
            const userInput = e.currentTarget.value;

            // Filter our suggestions that don't contain the user's input
            const filteredSuggestions = suggestions.filter(
              suggestion =>
                  suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            );

            // Update the user input and filtered suggestions, reset the active
            // suggestion and make sure the suggestions are shown
            this.setState({
                activeSuggestion: 0,
                filteredSuggestions,
                showSuggestions: true,
                userInput: e.currentTarget.value
            });
            if(this.props.lookupBalance) 
                this.props.lookupBalance(userInput);
        };

        // Event fired when the user clicks on a suggestion
        onClick = e => {
            // Update the user input and reset the rest of the state
            this.setState({
                activeSuggestion: 0,
                filteredSuggestions: [],
                showSuggestions: false,
                userInput: e.currentTarget.innerText
            });
            if(this.props.lookupBalance) 
                this.props.lookupBalance(e.currentTarget.innerText);
        };

        
        componentDidUpdate(prevProps) {
            if (prevProps.transactionNum != this.props.transactionNum) {
                this.setState({userInput: ""});
                this.props.lookupBalance("");
            }
        }

        render() {
            const {
                onChange,
                onClick,
                onKeyDown,
                state: {
                    activeSuggestion,
                    filteredSuggestions,
                    showSuggestions,
                    userInput
                }
            } = this;

            let suggestionsListComponent;

            if (showSuggestions && userInput) {
                if (filteredSuggestions.length) {
                    suggestionsListComponent = (
                      <MenuList>
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                              <MenuItem
                                className={className}
                              key={suggestion}
                    onClick={onClick}
                  >
                    {suggestion}
                  </MenuItem>
                        );
                })}
            </MenuList>
              );
        } else {
          suggestionsListComponent = (
            <div/>
          );
    }
}

return (
  <Fragment>
    <Input
      placeholder="Camper Name"
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={userInput}
      fullWidth
    />
{suggestionsListComponent}
  </Fragment>
    );
}
}

export default AutocompleteNames;