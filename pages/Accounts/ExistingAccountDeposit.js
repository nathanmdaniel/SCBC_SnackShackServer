import React from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

class ExistingAccountDeposit extends React.Component {
    onChange = e => {
        const userInput = parseInt(e.currentTarget.value);

        this.props.setAmount(userInput);
    };
    render() {
        return(
            <Input
                id="depositInput"
                placeholder="0.00"
                onChange={this.onChange}
                startAdornment={<InputAdornment position="start">+$</InputAdornment>}
            />
        );
    }
}

export default ExistingAccountDeposit;