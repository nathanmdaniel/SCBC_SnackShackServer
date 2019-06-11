import React from 'react';
import XLSX from 'xlsx';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';



class SnackButtons extends React.Component {

	constructor(props) {
            super(props);
            this.genButtons = this.genButtons.bind(this);
            this.state = {
                buttArr: this.genButtons(),
            };
        }

        genButtons() {
            const XLSX = require('xlsx');
            //var path = require('./SampleInventory.xlsx');
            //console.log(path);
            //var workbook = XLSX.readFile('./SampleInventory.xlsx');
            //console.log(workbook);
            var arr = [];
            for (var i = 0; i < 10; ++i)
                arr.push(<Button
			style={{backgroundColor: "#ec407a", color: '#faebd7'}}
    variant='contained'
    size='large'
    onClick={this.props.addChip.bind(this, "Snickers", 1.00)}
    > Snack</Button>);
    console.log(arr);
    return arr;
    }

    render() {
        var disp = this.state.buttArr.map(button => <div style={{ padding: 5}}> {button} </div>)
    console.log(disp);
        return (
			<div style={{ padding: 20 }}>
			   <Grid container>
				 {disp}
			   </Grid>
    </div>
		);
    }
}

export default SnackButtons;