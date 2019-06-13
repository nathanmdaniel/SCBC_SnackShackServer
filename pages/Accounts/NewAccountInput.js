import React from 'react';
import NewBalanceInput from './NewBalanceInput.js';
import NewNameInput from './NewNameInput.js';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class NewAccountInput extends React.Component {
    render() {
        return(
            <div>
			    <Typography gutterBottom variant="h5" component="h2">
				    New Account Input
			    </Typography>
                <Grid container>
                    <Grid item sm={8} xs={12}>
                        <NewNameInput/>
                    </Grid>
                    <Grid item sm={1} xs={0}/>
                    <Grid item sm={3} xs={4}>
				        <NewBalanceInput/>
                    </Grid>
                </Grid>
            </div>
		);
    }
}

export default NewAccountInput;