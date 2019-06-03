import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MainMenu from '../MainMenu/MainMenuDrawer.js'


class ButtonAppBar extends React.Component {
    render() {
        return (
          <div>
            <AppBar position="static" color="primary">
              <Toolbar>
                <MainMenu/>
                <Typography variant="h6" color="secondary">
                  Sandy Creek Bible Camp
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
      );
            }
}

export default ButtonAppBar;