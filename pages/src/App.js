import React from 'react';
import logo from './scbc_website_logo.png';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import ButtonAppBar from './ButtonAppBar/ButtonAppBar.js';
import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Register from './Register/Register.js';

/*
function App() {
    return (
        <MuiThemeProvider>
    <div className="App">
      <header className="App-header">
        <ButtonAppBar/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          We will have SCBC ss_register up and running soon!
        </a>
      </header>
    </div>
          </MuiThemeProvider>
  );
}
*/

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#B5D565"
        },
        secondary: {
            main: "#FAEBD7"
        },
        clothing: {
            main: "#ffd54f"
        },
        food: {
            main: "#B5D565"
        },
        drink: {
            main: "#e57373"
        },
        frozen: {
            main: "#64b5f6"
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
                <Register theme/>
            </div>
            </MuiThemeProvider>
        </div>
            );
            }
}

export default App;
