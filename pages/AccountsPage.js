import React from 'react';
import ButtonAppBar from './ButtonAppBar/ButtonAppBar.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NewAccountInput from './Accounts/NewAccountInput.js';
import NewBalanceInput from './Accounts/NewBalanceInput.js';
import ExistingAccountInput from './Accounts/ExistingAccountInput.js';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#B5D565"
		},
		secondary: {
			main: "#FAEBD7"
		}
	}
});

class AccountsPage extends React.Component {

	render() {
		return (
			<div>
                <MuiThemeProvider theme={theme}>
				<div>
					<ButtonAppBar/>
				</div>
				<Grid container justify='center' spacing={8} style={{padding: '50px'}}>
					<Grid item sm={1}/>
					<Grid item sm={6} style={{minHeight: '200px'}}>
						<Paper style={{padding:'50px'}}>
							<NewAccountInput/>
						</Paper>
					</Grid>
					<Grid item sm={1}/>
					<Grid item sm={6} style={{minHeight: '200px'}}>
						<Paper style={{padding:'50px'}}>
							<ExistingAccountInput/>
						</Paper>
					</Grid>
				</Grid>
                </MuiThemeProvider>
            </div>
        );
				}	
}

export default AccountsPage;
