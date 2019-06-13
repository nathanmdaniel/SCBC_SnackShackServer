import React from 'react';
import AutocompleteNames from '../../Accounts/AutocompleteNames.js'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class TransactionAccountLookup extends React.Component {
    constructor() {
        super();
        this.getNames = this.getNames.bind(this);
        this.lookupBalance = this.lookupBalance.bind(this);
        this.state = {
            accountJson: null,
            names: [],
            dispBalance: 0,
        };   
    }

    lookupBalance(matchName) {
        this.state.accountJson.forEach(info =>{
            if(info.Name === matchName) {
                this.state.dispBalance = info.Balance;
                console.log(info.Balance);
            }
        })
        this.forceUpdate();
    }

    getNames() {
        return this.state.names;
    }
    componentDidMount() {
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

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={8} >
                        <AutocompleteNames getNames={this.getNames} lookupBalance={this.lookupBalance}/>
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