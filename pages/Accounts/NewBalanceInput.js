import React from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

class NewBalanceInput extends React.Component {
    onChange = e => {
        const userInput = parseFloat(e.currentTarget.value);

        this.props.setTotal(userInput);
    };
    
    render() {
        return(
            <Input
            id="newBalanceInput"
            placeholder="0.00"
                onChange={this.onChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
        );
}
}

export default NewBalanceInput;