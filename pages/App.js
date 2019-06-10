import React from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import ButtonAppBar from './ButtonAppBar/ButtonAppBar.js';
import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Register from './Register/Register.js';
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

class App extends React.Component {
    render() {
            return (
                <div>
                    <MuiThemeProvider theme={theme}>
                    <div>
                        <ButtonAppBar/>
                    </div>
                    <div>
                        <Grid container spacing={10} justify='center'>
				            <Grid item xs={12} sm={6} style={{minHeight: '250px', padding: '50px'}}>
                                <img width="700" height="200" src="../static/scbc_website_logo.png"/>
                            </Grid>
                        </Grid>
                    </div>
                    </MuiThemeProvider>
                </div>
            );
                    }
}

export default App;
