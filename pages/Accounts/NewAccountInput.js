import React from 'react';
import NewBalanceInput from './NewBalanceInput.js';
import NewNameInput from './NewNameInput.js';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';

class NewAccountInput extends React.Component {
    constructor() {
        super();
        this.setName = this.setName.bind(this);
        this.setTotal = this.setTotal.bind(this);
        this.sendNewAccount = this.sendNewAccount.bind(this);
        this.state = {
            name: "placeholder",
            total: 0
        };
    }

    setName(inName) {
        this.setState({name: inName});
    }

    setTotal(inTotal) {
        this.setState({total: inTotal});
    }

    sendNewAccount() {
        if(this.state.name === "placeholder" || this.state.name === "") {
            this.setState({
                balance: 0
            });
            document.getElementById("newBalanceInput").value = "";
            return;
        }
        fetch('http://192.168.1.16:3001/NewAccount', {
        // fetch('http://localhost:3001/NewAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                balance: this.state.total
            })
        }).then(response => {
            return response.json();
        })
        .then(myJson => {
            var outputString = "Created account for \"" + myJson.name + "\" with balance $" + myJson.balance + "\n";
            document.getElementById("server-output").value += outputString;
        }).catch((error) => {
            console.log(error);
        });
        this.setState({
            name: "placeholder",
            balance: 0
        });
        document.getElementById("newBalanceInput").value = "";
        document.getElementById("newNameInput").value = "";
    }

    render() {
        return(
            <div>
			    <Typography gutterBottom variant="h5" component="h2">
				    New Account Input
			    </Typography>
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={12}>
                        <NewNameInput transactionNum={this.state.transactionNum} setName={this.setName}/>
                    </Grid>
                    <Grid item sm={1} xs={false}/>
                    <Grid item sm={3} xs={4}>
				        <NewBalanceInput transactionNum={this.state.transactionNum} setTotal={this.setTotal}/>
                    </Grid>
                    <Grid item sm={9} xs={3}/>
                    <Grid item sm={3} xs={4}>
                        <Button fullWidth onClick={this.sendNewAccount} style={{backgroundColor:'#c5e1a5', color: '#558b2f'}}>
						    <SvgIcon>
							    <path d="M15.54,3.5L20.5,8.47L19.07,9.88L14.12,4.93L15.54,3.5M3.5,19.78L10,13.31C9.9,13 9.97,12.61 10.23,12.35C10.62,11.96 11.26,11.96 11.65,12.35C12.04,12.75 12.04,13.38 11.65,13.77C11.39,14.03 11,14.1 10.69,14L4.22,20.5L14.83,16.95L18.36,10.59L13.42,5.64L7.05,9.17L3.5,19.78Z" />
						    </SvgIcon>
					    </Button>
                    </Grid>
                </Grid>
            </div>
		);
    }
}

export default NewAccountInput;