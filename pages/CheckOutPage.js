import React from 'react';
import ButtonAppBar from './ButtonAppBar/ButtonAppBar.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EnvelopeList from './CheckOut/EnvelopeList.js';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#B5D565"
		},
		secondary: {
			main: "#FAEBD7"
        }
	}
});

class CheckOutPage extends React.Component {
    constructor(props) {
        super(props);
        this.setChecked = this.setChecked.bind(this);
        this.merge = this.merge.bind(this);
        this.divide = this.divide.bind(this);

    }
    state = {
        // envel_arr: [[["Christopher Scott", 7.50]],[["Shirley Temple", 0.50], ["Zachary Temple", 2.00]], [["Jon Snow", 47.50]]],
        envel_arr: [],
        checked: []
    };

    readAccounts() {
        // var url = 'http://192.168.1.2:3001/RecordsJson'
        var url = 'http://localhost:3001/RecordsJson'
        fetch(url).then(response => {
            return response.json();
        })
        .then(myJson => {
            var ret = [];
            myJson.forEach(info =>{
                ret.push([[info.Name, info.Balance]])
            })
            console.log(ret);
            console.log(typeof ret[0][0], typeof ret[0][1])
            this.setState({envel_arr: ret});
        })
        .catch((error) => {
            console.error(error);
        });
    }
    componentDidMount() {
        this.readAccounts();
    }

    setChecked(newCheckedIndex) {
        const currentIndex = this.state.checked.indexOf(newCheckedIndex);
        const newChecked = [...this.state.checked];
    
        if (currentIndex === -1) {
          newChecked.push(newCheckedIndex);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        this.setState( {checked: newChecked} );
    }

    merge() {
        // console.log("in merge")
        
        // console.log("checked (entering merge) ", this.state.checked)
        var new_envel = [...this.state.envel_arr];
        // add duplicate first
        for (var i = 1; i < this.state.checked.length; ++i) {
            const toAdd = new_envel[this.state.checked[i]];
            // console.log("checked[0]: ", new_envel[this.state.checked[0]]);
            // console.log("toAdd: ", toAdd);
            new_envel[this.state.checked[0]] = new_envel[this.state.checked[0]].concat(toAdd);
        }
        // remove originals (start from end to not corrupt index values)
        for (var i = this.state.checked.length - 1; i > 0; --i) {
            const toAdd = new_envel.splice(this.state.checked[i], 1)[0];
        }
        // console.log(new_envel)
        this.setState({envel_arr: new_envel, checked: []});
    }

    divide() {
        var new_envel = [...this.state.envel_arr];
        var copy_checked = [...this.state.checked];
        for (var i = 0; i < copy_checked.length; ++i) {
            const envel_ind = copy_checked[i]
            // console.log("dividing ", new_envel[envel_ind])
            const toAdd = new_envel[envel_ind].splice(1, new_envel[envel_ind].length - 1);
            // console.log("checked[0]: ", new_envel[this.state.checked[0]]);
            // console.log(i, " toAdd: ", toAdd);
            // console.log(toAdd.pop())
            var added = toAdd.length;
            while (toAdd.length > 0) {
                new_envel.splice(envel_ind + 1, 0, [toAdd.pop()]);
                // console.log(new_envel)
            }
            for (var j = i; j < copy_checked.length; ++j) {
                if (copy_checked[j] > envel_ind) {
                    copy_checked[j] += added;
                }
            }
        }
        this.setState({envel_arr: new_envel, checked: []});
        // console.log("envel_arr ", this.state.envel_arr)
        // console.log("checked ", this.state.checked)
    }

	render() {
		return (
			<div>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <ButtonAppBar/>
                    </div>
                    <Grid container justify='center' spacing={4} style={{padding: '20px'}}>
                        <Grid item sm={10} style={{minHeight: '200px'}}>
                            <Paper style={{padding:'30px',  maxHeight: '400px', overflow: 'auto'}}>
                                <Grid container style={{padding:'10px'}}>
                                    <Grid item sm={7}>
                                        <Typography variant='h5'>Envelopes</Typography>
                                    </Grid>
                                    <Grid item sm={1}>
                                        <Typography variant='overline'>$20</Typography>
                                    </Grid>
                                    <Grid item sm={1}>
                                        <Typography variant='overline'>$10</Typography>
                                    </Grid>
                                    <Grid item sm={1}>
                                        <Typography variant='overline'>$5</Typography>
                                    </Grid>
                                    <Grid item sm={1}>
                                        <Typography variant='overline'>$1</Typography>
                                    </Grid>
                                    <Grid item sm={1}>
                                        <Typography variant='overline'>$0.25</Typography>
                                    </Grid>
                                </Grid>
                                <EnvelopeList envelopes={this.state.envel_arr} checked={this.state.checked} setChecked={this.setChecked}/>
                            </Paper>
                        </Grid>
                        <Grid item sm={10} style={{minHeight: '200px'}}>
                            <Paper style={{padding:'20px'}}>
                                <Grid container>
                                    <Grid item sm={8}>
                                        <Typography variant='h6'>Selected Items: {this.state.checked.length}</Typography>
                                    </Grid>
                                    <Grid item sm={2}>
                                        <Button variant="contained" onClick={this.merge} style={{backgroundColor: '#6891E9', color: 'white'}}>
                                            Merge
                                        </Button>
                                    </Grid>
                                    <Grid item sm={2}>
                                        <Button variant="contained" onClick={this.divide} style={{backgroundColor: '#E86C16', color: 'white'}}>
                                            Divide
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </MuiThemeProvider>
            </div>
        );
				}	
}

export default CheckOutPage;
