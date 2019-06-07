import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ButtonAppBar from './ButtonAppBar/ButtonAppBar.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Register from './Register/Register.js';

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

class RegisterPage extends React.Component {
    render() {
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <ButtonAppBar/>
                    </div>
                    <div>
                        <Register theme/>
                    </div>
                    </MuiThemeProvider>
                </div>
            );
                    }
}

export default RegisterPage;
