import React from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

class NewBalanceInput extends React.Component {
    render() {
        return(
            <Input
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
        );
}
}

export default NewBalanceInput;