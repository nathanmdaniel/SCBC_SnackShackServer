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
                <Grid container spacing={8}>
                    <Grid item sm={8} xs={12}>
                        <AutocompleteNames getNames={this.getNames}/>
                    </Grid>
                    <Grid item sm={1} xs={false}/>
                    <Grid item sm={3} xs={4}>
                        <ExistingAccountDeposit/>
                    </Grid>
                    <Grid item sm={9} xs={3}/>
                    <Grid item sm={3} xs={4}>
                        <Button fullWidth style={{backgroundColor:'#c5e1a5', color: '#558b2f'}}>
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