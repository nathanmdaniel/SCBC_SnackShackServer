import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Tabs from './RegisterButtonSide/Tabs.js';
import TransactionCard from './RegisterTransactionSide/TransactionCard.js'
import RegisterButtonContainer from './RegisterButtonSide/RegisterButtonContainer.js';
import CheckoutChip from './RegisterTransactionSide/CheckoutChip.js';
import TextField from '@material-ui/core/TextField';

import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: "10px",
    },
});

function genChipLabel(itemName, price) {
    return itemName + "  $" + price.toFixed(2);
}


class Register extends React.Component {
    constructor() {
        super();
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleSendClick = this.handleSendClick.bind(this);
        this.handleChipClick = this.handleChipClick.bind(this);
    }

    state = {
        chips: [],
        prices: [],
        items: [],
        total: 0,
        transactionNum: 0,
        activeChipIndex: 0
    };

    handleChipClick(chip) {
        for (var i = 0; i < this.state.chips.length; ++i) {
            if(this.state.chips[i].props.label == chip.props.label) {
                this.setState({activeChipIndex: i});
                return;
            }
        }
    }

    handleButtonClick(itemName, sourceSheet, price) {
        this.state.chips.push(
        <CheckoutChip
            label={genChipLabel(itemName, price)}
            handleChipClick={this.handleChipClick}
        />);
        this.state.items.push({sheet: sourceSheet, item: itemName});
        this.state.prices.push(price);
        this.state.total = this.state.total + price;
        this.setState({activeChipIndex: this.state.chips.length - 1});
        this.forceUpdate();
    }

    handleRemoveClick() {
        this.state.chips.splice(this.state.activeChipIndex, 1);
        this.state.items.splice(this.state.activeChipIndex, 1);
        this.state.total -= this.state.prices.splice(this.state.activeChipIndex, 1);
        this.setState({activeChipIndex: this.state.chips.length - 1});
        this.forceUpdate();
    }

    handleSendClick(customerName) {
        const cost = this.state.total;
        fetch('http://192.168.1.16:3001/DecInventories', {
            // fetch('http://localhost:3001/DecInventories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: customerName,
                price: this.state.total,
                items: this.state.items
            })
        }).then(response => {
            return response.json();
        })
        .then(myJson => {
            var outputString = ""
            if (myJson.found) {
                outputString = "Successfully charged \"" + customerName + "\" $" + cost + "\n";
            }
            else {
                outputString = "Failed to charge \"" + customerName + "\" $" + cost + "\n";
            }
            if (myJson.outOfStock.length > 0) {

                document.getElementById("server-output").value += "WARNING! The following items appear to be out of stock: " + myJson.outOfStock.toString() + "\n";
            }
            document.getElementById("server-output").value += outputString;
        })
        .catch((error) => {
            console.log(error);
        });

        //request({
        //    url: url,
        //    method: "POST",
        //    json: true,   // <--Very important!!!
        //    body: myJSONObject
        //}, function (error, response, body){
        //    console.log(response);
        //});

        // this.state.chips = [];
        // this.state.prices = [];
        // this.state.items = [];
        // this.state.total = 0;
        // this.state.transactionNum++;
        const newTN = this.state.transactionNum + 1;
        this.setState({
            chips: [],
            prices: [],
            items: [],
            total: 0,
            transactionNum: newTN
        });
        this.forceUpdate();
    }
// <textarea id="server-output" readOnly style={{width:'100%'}}/>
    render() {
        const { classes } = this.props;
        const tc_key = `transaction-card-${this.state.transactionNum}`;

        return (
          <div className={classes.root}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={8}>
                    <RegisterButtonContainer addChip={this.handleButtonClick}/>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TransactionCard 
                    key={tc_key}
                  chips={this.state.chips} 
                  removeClick={this.handleRemoveClick}
                  sendClick={this.handleSendClick}
                  transactionTotal={this.state.total}
                  transactionNum={this.state.transactionNum}
                  style={{padding: "10px"}}
                  > 
                </TransactionCard>
              </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        id="server-output"
                        multiline
                        rows={2}
                        fullWidth
                        variant="outlined"
                        />
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