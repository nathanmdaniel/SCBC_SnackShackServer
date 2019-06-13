import React from 'react';
import Typography from '@material-ui/core/Typography';
import ExistingAccountLookup from './ExistingAccountLookup.js';
import ExistingAccountDeposit from './ExistingAccountDeposit.js';
import AutocompleteNames from './AutocompleteNames.js';
import Grid from '@material-ui/core/Grid';

class ExistingAccountInput extends React.Component {
    constructor() {
        super();
        this.getNames = this.getNames.bind(this);
        this.state = {
            accountJson: null,
            names: [],
        };   
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
        return(
            <div>
			    <Typography gutterBottom variant="h5" component="h2">
				    Existing Account Update
			    </Typography>
                <Grid container>
                    <Grid item sm={8} xs={12}>
                        <AutocompleteNames getNames={this.getNames}/>
                    </Grid>
                    <Grid item sm={1} xs={false}/>
                    <Grid item sm={3} xs={4}>
                        <ExistingAccountDeposit/>
                    </Grid>
                </Grid>
            </div>
		);
    }
}

export default ExistingAccountInput;