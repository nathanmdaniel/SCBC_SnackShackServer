import React from 'react';
import Input from '@material-ui/core/Input';

class ExistingAccountLookup extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange = event => {
        this.props.update(event.target.value);
    };

    render() {
        return(
            <Input
            onChange={this.handleChange}
            placeholder="Camper Name"
            inputProps={{'aria-label': 'Description',}}
            />
        );
}
}

export default ExistingAccountLookup;