import React from 'react';
import XLSX from 'xlsx';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';




class ClothingButtons extends React.Component {
	

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
				style={{backgroundColor:"#8d6e63", color: '#faebd7', fontWeight: 'bold'}}
				variant='contained'
				size='large'
				onClick={this.props.addChip.bind(this, "Blue Shirt", 10.00)}
				> Clothing</Button>);
		return arr;
	}

	render() {
		return (
			<div style={{ padding: 20 }}>
			   <Grid container>
				 {this.state.buttArr.map(button => <div style={{ padding: 5 }}> {button} </div>)}
			   </Grid>
			 </div>
		);
	}
}

export default ClothingButtons;