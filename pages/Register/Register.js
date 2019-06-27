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

function genChipLabel(itemName, price) {
    return itemName + "  $" + price.toFixed(2);
}


class Register extends React.Component {
    constructor() {
        super();
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleSendClick = this.handleSendClick.bind(this);
    }

    state = {
        chips: [],
        prices: [],
        total: 0,
        transactionNum: 0,
        merchSheet: null,
        snacksSheet: null,
        drinkSheet: null,
        frozenSheet: null,
    };

    handleButtonClick(itemName, price) {
        this.state.chips.push(
        <Chip
            label={genChipLabel(itemName, price)}
			onClick={handleChipClick}
            style={{color: '#283593', width: '100%', fontWeight: 'bold', margin: 1}}
        />);
        this.state.prices.push(price);
        this.state.total = this.state.total + price;
        this.forceUpdate();
    }

    handleRemoveClick() {

        this.state.chips.pop();
        this.state.total -= this.state.prices.pop();
        this.forceUpdate();
    }

    handleSendClick() {
        var http = new XMLHttpRequest();
        var url = 'http://localhost:3001/DecInventories';

        //var data = new FormData();
        //data.append('user', 'person');
        //data.append('pwd', 'password');
        //data.append('organization', 'place');
        //data.append('requiredkey', 'key');
        //Send the proper header information along with the request
        //http.setRequestHeader('Content-type', 'application/json');
        //http.send(data);

        /*
        // try 2
        var data = JSON.stringify("sent string successfully");

        http.open('POST', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');
        
        http.send(data);
        console.log("sent data");
        */

        //try 3
        //var request = require('request');
        //http.open('POST', url, true);
        //var myJSONObject = JSON.stringify("sent string successfully");
        //console.log(myJSONObject);
        //console.log(JSON.parse(myJSONObject))
        ////Send the proper header information along with the request
        //http.setRequestHeader('Content-type', 'application/json');

        //http.onreadystatechange = function() {
        //    if(http.readyState == 4 && http.status == 200) {
        //        alert(http.responseText);
        //    }
        //}

        //http.send(myJSONObject);


        //try 4: 
        fetch('http://localhost:3001/DecInventories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    name: "John",
                    email: "john@example.com"
                }
            })
        });

        //request({
        //    url: url,
        //    method: "POST",
        //    json: true,   // <--Very important!!!
        //    body: myJSONObject
        //}, function (error, response, body){
        //    console.log(response);
        //});

        this.state.chips = [];
        this.state.prices = [];
        this.state.total = 0;
        this.state.transactionNum++;
        this.forceUpdate();
    }

    render() {
        const { classes } = this.props;

        return (
          <div className={classes.root}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={8}>
                    <RegisterButtonContainer addChip={this.handleButtonClick}/>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TransactionCard 
                  chips={this.state.chips} 
                  removeClick={this.handleRemoveClick}
                  sendClick={this.handleSendClick}
                  transactionTotal={this.state.total}
                  transactionNum={this.state.transactionNum}
                  > 
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