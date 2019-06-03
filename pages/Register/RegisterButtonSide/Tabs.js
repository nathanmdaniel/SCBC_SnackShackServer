import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { withTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = {
    root: {
        flexGrow: 1,
        maxWidth: 1000,
    },
};

class IconTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
        this.props.setActiveFunc(value);
    };

    render() {
        const { classes } = this.props;

            return (
              <Paper square className={classes.root}>
                <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
      
        <Tab style={{backgroundColor: "#8d6e63"}} icon={<SvgIcon>
            <path d="M16,21H8A1,1 0 0,1 7,20V12.07L5.7,13.07C5.31,13.46 4.68,13.46 4.29,13.07L1.46,10.29C1.07,9.9 1.07,9.27 1.46,8.88L7.34,3H9C9,4.1 10.34,5 12,5C13.66,5 15,4.1 15,3H16.66L22.54,8.88C22.93,9.27 22.93,9.9 22.54,10.29L19.71,13.12C19.32,13.5 18.69,13.5 18.3,13.12L17,12.12V20A1,1 0 0,1 16,21" />
            </SvgIcon>} />
        <Tab style={{backgroundColor: "#ec407a"}} icon={<SvgIcon> 
            <path d="M20,10C22,13 17,22 15,22C13,22 13,21 12,21C11,21 11,22 9,22C7,22 2,13 4,10C6,7 9,7 11,8V5C5.38,8.07 4.11,3.78 4.11,3.78C4.11,3.78 6.77,0.19 11,5V3H13V8C15,7 18,7 20,10Z" />
        </SvgIcon>} />
        <Tab style={{backgroundColor: "#26a69a"}} icon={<SvgIcon> 
            <path d="M18.32,8H5.67L5.23,4H18.77M12,19A3,3 0 0,1 9,16C9,14 12,10.6 12,10.6C12,10.6 15,14 15,16A3,3 0 0,1 12,19M3,2L5,20.23C5.13,21.23 5.97,22 7,22H17C18,22 18.87,21.23 19,20.23L21,2H3Z" />
        </SvgIcon>} />
        <Tab style={{backgroundColor: "#42a5f5"}} icon={<SvgIcon> 
            <path d="M12,2C14.21,2 16,3.79 16,6.05C17.14,6.28 18,7.29 18,8.5A2.5,2.5 0 0,1 15.5,11H8.5A2.5,2.5 0 0,1 6,8.5C6,7.29 6.86,6.28 8,6A4,4 0 0,1 12,2M9,12H15L13,22H11L9,12Z" />
        </SvgIcon>} />
        </Tabs>
      </Paper>
    );
    }
        }

IconTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconTabs);
