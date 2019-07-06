import React from 'react';
import Input from '@material-ui/core/Input';

class NewNameInput extends React.Component {
    onChange = e => {
        const userInput = e.currentTarget.value;

        this.props.setName(userInput);
    };
    render() {
        return(
            <Input
            id="newNameInput"
            onChange={this.onChange}
            placeholder="Camper Name"
            inputProps={{'aria-label': 'Description',}}
            fullWidth
            />
        );
    }
}

export default NewNameInput;