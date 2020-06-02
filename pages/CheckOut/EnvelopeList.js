import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';


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

export default function EnvelopeList(props) {

  var envel_arr = props.envelopes;

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
            console.log("current envelope", value)

            return (
            <ListItem key={value} role={undefined} dense button onClick={() => {props.setChecked(envel_ind)}}>
                <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={props.checked.indexOf(envel_ind) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    color='primary'
                />
                </ListItemIcon>
                <Paper elevation='4' style={{padding:'20px', flexGrow: 1}}>
                    <Grid container spacing={8} style={{padding: '20px'}}>
                        {value.map((individual) =>{
                            return(
                                <Grid container spacing={2} style={{padding: '8px'}}>
                                    <Grid item sm={5}>
                                        <Typography variant='body1'>{individual[0]}</Typography>
                                    </Grid>
                                    <Grid item sm={2}>
                                        <Typography variant='body2'>${individual[1].toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item sm={5}/>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Grid container spacing={2} style={{paddingTop: '4px'}}>
                        <Grid item sm={7}>
                            <Divider variant="middle" style={{marginLeft: '0px', flexGrow: 1}}/>
                        </Grid>
                        <Grid item sm={5}/>
                        <Grid item sm={5}/>
                        <Grid item sm={2}>
                            <Typography variant='body2'>${total.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item sm={1}>
                            <Typography variant='body2'>{bills[0]}</Typography>
                        </Grid>
                        <Grid item sm={1}>
                            <Typography variant='body2'>{bills[1]}</Typography>
                        </Grid>
                        <Grid item sm={1}>
                            <Typography variant='body2'>{bills[2]}</Typography>
                        </Grid>
                        <Grid item sm={1}>
                            <Typography variant='body2'>{bills[3]}</Typography>
                        </Grid>
                        <Grid item sm={1}>
                            <Typography variant='body2'>{bills[4]}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </ListItem>
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
}