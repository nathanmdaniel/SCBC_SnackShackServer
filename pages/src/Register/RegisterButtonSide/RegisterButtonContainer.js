import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from './Tabs.js';
import ButtonLoader from './ButtonLoader.js';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: "10px",
    },
});

class RegisterButtonContainer extends React.Component{
    constructor(props) {
        super(props);
        this.setActiveTab = this.setActiveTab.bind(this);
        this.state = {
            activeTab: 0,
        };
    }

    setActiveTab(value) {
        this.state.activeTab = value;
        this.forceUpdate();
    }

    render () {
        return (
        <div>
            <Paper style={{padding: "20px", textAlign: 'center', margin: "10px"}}> 
                <div>
                    <Tabs setActiveFunc={this.setActiveTab}/>
                </div>    
                <div>
                    <ButtonLoader activeTab={this.state.activeTab} addChip={this.props.addChip}/>
                </div>    
            </Paper>
        </div>
        );}
}

    RegisterButtonContainer.propTypes = {
        classes: PropTypes.object.isRequired,
    };

export default withStyles(styles)(RegisterButtonContainer);
            