import React from 'react';
import Input from '@material-ui/core/Input';

class NewNameInput extends React.Component {
    render() {
        return(
            <Input
            placeholder="Camper Name"
            inputProps={{'aria-label': 'Description',}}
            />
        );
    }
}

export default NewNameInput;