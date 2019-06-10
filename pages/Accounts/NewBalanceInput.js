import React from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

class NewBalanceInput extends React.Component {
    render() {
        return(
            <Input
            placeholder="0.00"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
        );
}
}

export default NewBalanceInput;