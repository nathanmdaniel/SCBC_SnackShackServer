import React from 'react';
import Typography from '@material-ui/core/Typography';
import ExistingAccountLookup from './ExistingAccountLookup.js';
import ExistingAccountDeposit from './ExistingAccountDeposit.js';
import AutocompleteNames from './AutocompleteNames.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';

class ExistingAccountInput extends React.Component {
    constructor() {
        super();
        this.getNames = this.getNames.bind(this);
        this.setCurName = this.setCurName.bind(this);
        this.setAddAmount = this.setAddAmount.bind(this);        
        this.updateExistingAccount = this.updateExistingAccount.bind(this);
        this.state = {
            accountJson: null,
            names: [],
            curName: "placeholder",
            addAmount: 0,
            transactionNum: 0,
        };   
    }

    setCurName(newName) {
        this.setState({curName: newName});
    }

    setAddAmount(newAmount) {
        this.setState({addAmount: newAmount});
    }

    getNames() {
        return this.state.names;
    }

    updateExistingAccount() {
        if(this.state.curName === "placeholder" || this.state.name === "") {
            this.setState({
                balance: 0
            });
            document.getElementById("depositInput").value = "";
            return;
        }
        fetch('http://192.168.1.28:3001/CreditAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.curName,
                amount: this.state.addAmount
            })
        }).catch((error) => {
            console.log(error);
        });
        this.setState({
            name: "placeholder",
            balance: 0,
            transactionNum: this.state.transactionNum + 1
        });
        document.getElementById("depositInput").value = "";

    }

    componentDidMount() {
        var url = 'http://192.168.1.28:3001/RecordsJson'
        fetch(url).then(response => {
            return response.json();
        })
        .then(myJson => {
            var ret = [];
            myJson.forEach(info =>{
                ret.push(info.Name)
            })
            this.setState({accountJson: myJson, names: ret});
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return(
            <div>
			    <Typography gutterBottom variant="h5" component="h2">
				    Existing Account Update
			    </Typography>
                <Grid container spacing={8}>
                    <Grid item sm={8} xs={12}>
                        <AutocompleteNames transactionNum={this.state.transactionNum} setCamperName={this.setCurName} getNames={this.getNames}/>
                    </Grid>
                    <Grid item sm={1} xs={false}/>
                    <Grid item sm={3} xs={4}>
                        <ExistingAccountDeposit setAmount={this.setAddAmount}/>
                    </Grid>
                    <Grid item sm={9} xs={3}/>
                    <Grid item sm={3} xs={4}>
                        <Button fullWidth onClick={this.updateExistingAccount} style={{backgroundColor:'#c5e1a5', color: '#558b2f'}}>
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

export default ExistingAccountInput;