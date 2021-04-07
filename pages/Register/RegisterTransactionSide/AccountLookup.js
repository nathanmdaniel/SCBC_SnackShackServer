import React from 'react';
import AutocompleteNames from '../../Accounts/AutocompleteNames.js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class TransactionAccountLookup extends React.Component {
    constructor(props) {
        super(props);
        this.getNames = this.getNames.bind(this);
        this.lookupBalance = this.lookupBalance.bind(this);
        this.readAccounts = this.readAccounts.bind(this);
        this.state = {
            accountJson: null,
            names: [],
            dispBalance: 0,
        };   
    }

    lookupBalance(matchName) {
        var found = 0;
        this.state.accountJson.forEach(info =>{
            if(info.Name === matchName) {
                this.state.dispBalance = info.Balance;
                found = 1;
            }
        })
        if (!found)
            this.state.dispBalance = 0;
        this.forceUpdate();
    }

    getNames() {
        return this.state.names;
    }
    readAccounts() {
        // var url = 'http://192.168.1.16:3001/RecordsJson'
        var url = 'http://localhost:3001/RecordsJson'
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
    componentDidMount() {
        this.readAccounts();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.transactionNum != this.props.transactionNum) {
            this.readAccounts();
        }
    }
    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={8} >
                        <AutocompleteNames setCamperName={this.props.setCamperName} getNames={this.getNames} lookupBalance={this.lookupBalance} transactionNum={this.props.transactionNum}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography
                            align='right'
                            variant='h5'
                        >
                            ${this.state.dispBalance.toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            );
    }
}

export default TransactionAccountLookup;