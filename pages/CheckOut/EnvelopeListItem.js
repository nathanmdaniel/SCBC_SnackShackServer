import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';




//props: value, envel_ind, setChecked, bills

export default function EnvelopeListItem(props) {
    const [dispCheck, setCheck] = React.useState(false);
    // console.log("item refreshing", dispCheck)

    const handleCheck = () => {
        //update parent's list
        props.setChecked(props.envel_ind);
        //change state
        if (dispCheck == false) {
            setCheck(true);
        }
        else {
            setCheck(false);
        }
    };
    // ** removed key={props.value} because EnvelopeListItem gets a key
    return (
        <ListItem role={undefined} dense button onClick={() => {handleCheck()}}>
                <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={dispCheck}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': props.labelId }}
                    color='primary'
                />
                </ListItemIcon>
                <Paper elevation={4} style={{padding:'20px', flexGrow: 1}}>
                    <Grid container spacing={8} style={{padding: '20px'}}>
                        {props.value.map((individual) =>{
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
                            <Typography variant='body2'>${props.total.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item sm={1}>
                            <Typography variant='body2'>{props.bills[0]}</Typography>
                        </Grid>
                        <Grid item sm={1}>
                            <Typography variant='body2'>{props.bills[1]}</Typography>
                        </Grid>
                        <Grid item sm={1}>
                            <Typography variant='body2'>{props.bills[2]}</Typography>
                        </Grid>
                        <Grid item sm={1}>
                            <Typography variant='body2'>{props.bills[3]}</Typography>
                        </Grid>
                        <Grid item sm={1}>
                            <Typography variant='body2'>{props.bills[4]}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </ListItem>
    );
}