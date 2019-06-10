import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ButtonAppBar from './ButtonAppBar/ButtonAppBar.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Register from './Register/Register.js';
import fetch from 'isomorphic-fetch';

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
    constructor() {
        super();
        const http = require('http');
        const XLSX = require('xlsx');
        /*
        var server = http.get({
            hostname: 'localhost',
            port: 3001,
        }, (res) => {
            console.log("# # # # # # res from Register" + (res));
            var sheet = XLSX.utils.json_to_sheet(res);
            console.log(sheet);
        });
        */
        ///*
        var server = fetch("http://localhost:3001/RegisterPage")
            .then(function(response) {
                console.log(response);
            });
         //*/
        

    }
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
