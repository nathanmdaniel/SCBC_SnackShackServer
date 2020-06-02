import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountsMenuItem from '../MainMenuItems/AccountsMenuItem.js'
import RegisterMenuItem from '../MainMenuItems/RegisterMenuItem.js'
import CheckOutMenuItem from '../MainMenuItems/CheckOutMenuItem.js'

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class TemporaryDrawer extends React.Component {
    state = {
        left: false,
        };

    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
    };

    render() {
        const { classes } = this.props;
        const sideList = (
            <div className={classes.list}>
            <List>
                <RegisterMenuItem/>
                <AccountsMenuItem/>
                <CheckOutMenuItem/>
            </List>
            </div>
        );
        return (
            <div>
            <IconButton className="iconButton" color="secondary" onClick={this.toggleDrawer('left', true)}>
                <MenuIcon />
            </IconButton>
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
                >
                {sideList}
                </div>
            </Drawer>
            </div>
        );
                }
}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);