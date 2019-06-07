import React from 'react';
import NewBalanceInput from './NewBalanceInput.js';
import NewNameInput from './NewNameInput.js';
import Typography from '@material-ui/core/Typography';

class NewAccountInput extends React.Component {
    render() {
        return(
            <div>
			    <Typography gutterBottom variant="h5" component="h2">
				    New Account Input
			    </Typography>
                <NewNameInput/>
            </div>
		);
    }
}

export default NewAccountInput;