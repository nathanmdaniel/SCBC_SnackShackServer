import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Tabs from './RegisterButtonSide/Tabs.js';
import TransactionCard from './RegisterTransactionSide/TransactionCard.js'
import RegisterButtonContainer from './RegisterButtonSide/RegisterButtonContainer.js';
import Chip from '@material-ui/core/Chip';

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

function handleChipClick() {
    console.log("chip clicked");
}


class Register extends React.Component {
    state = {
        chips: [],
    };

    handleButtonClick() {
        this.state.chips.push(
        <Chip
            label='Blue Shirt          $10.00'
			onClick={handleChipClick}
        style={{color: '#283593', width: '100%', fontWeight: 'bold', margin: 1}}
        />
        );
        this.forceUpdate();
    }

    constructor() {
        super();
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    render() {
        const { classes } = this.props;

        return (
          <div className={classes.root}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={8}>
                    <RegisterButtonContainer addChip={this.handleButtonClick}/>
              </Grid>
              <Grid item xs={9} sm={4}>
                <TransactionCard chips={this.state.chips}> 
                </TransactionCard>
              </Grid>
            </Grid>
          </div>
        );
            }
}

  Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);