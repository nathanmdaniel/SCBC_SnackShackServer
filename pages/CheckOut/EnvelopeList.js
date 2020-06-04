import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EnvelopeListItem from './EnvelopeListItem.js';


const theme = createMuiTheme({
    palette: {
		primary: {
			main: "#E90C3E"
		},
		secondary: {
			main: "#FAEBD7"
		}
	}
});

function calcTotal(envelope) {
    var tup;
    var output = 0.0
    for (tup of envelope) {
        output += tup[1];
    }
    return output;
} 

function calcNumBills(balance){
    var ret = [0, 0, 0, 0, 0];
    ret[0] = Math.floor(balance / 20);
    balance %= 20;
    ret[1] = Math.floor(balance / 10);
    balance %= 10;
    ret[2] = Math.floor(balance / 5);
    balance %= 5;
    ret[3] = Math.floor(balance / 1);
    balance %= 1;
    ret[4] = Math.floor(balance / 0.25);

    return ret;
}



//<ListItemText id={labelId} primary={extractName(value)}/>

class EnvelopeList extends React.Component {
    constructor(props) {
        super(props);
    }

    // state = {
    //     condVar: 1
    // };

    // var rendered = useRef();
    // rendered = false;
    // incrCV = () => {
    //     console.log()
    //     this.setState({condVar: this.state.condVar + 1})
    // }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextProps.checked.length, this.props.checked.length, rendered)
        if (nextProps.envelopes.length != this.props.envelopes.length) {
            return true;
        }
        // else if (rendered = false) {
        //     return true;
        // }
        return false;
    }

  render() {
    var envel_arr = this.props.envelopes;
  
    var grand_total = 0;
    var total_bills = [0, 0, 0, 0, 0];
    return (
        <MuiThemeProvider theme={theme}>
            <List className={theme}>
            {envel_arr.map((value, envel_ind) => {
                const labelId = `checkbox-list-label-${envel_ind}`;
                // console.log(labelId)
                const total = calcTotal(value);
                grand_total += total;
                const bills = calcNumBills(total);
                for (var i = 0; i < 5; ++i) {
                    total_bills[i] += bills[i];
                }
                // console.log(total_bills)
                // console.log(grand_total)
                // console.log("current envelope", value)

                return (
                    <EnvelopeListItem key={value} value={value} total={total} labelId={labelId} envel_ind={envel_ind} setChecked={this.props.setChecked} bills={bills}/>
                );
            })}
            </List>
            <Grid container style={{padding: '20px'}}>
                <Grid item sm={1}/>
                <Grid item sm={4}>
                    <Typography variant='h6'>Grand Total</Typography>
                </Grid>
                <Grid item sm={2}>
                    <Typography variant='body1'>${grand_total.toFixed(2)}</Typography>
                </Grid>
                <Grid item sm={1}>
                    <Typography align="center" variant='body1'>{total_bills[0]}</Typography>
                </Grid>
                <Grid item sm={1}>
                    <Typography align="center" variant='body1'>{total_bills[1]}</Typography>
                </Grid>
                <Grid item sm={1}>
                    <Typography align="center" variant='body1'>{total_bills[2]}</Typography>
                </Grid>
                <Grid item sm={1}>
                    <Typography align="center" variant='body1'>{total_bills[3]}</Typography>
                </Grid>
                <Grid item sm={1}>
                    <Typography align="center" variant='body1'>{total_bills[4]}</Typography>
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
  };
}

export default EnvelopeList;