import React from 'react';
import XLSX from 'xlsx';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';



class SnackButtons extends React.Component {

	constructor(props) {
            super(props);
            this.state = {
                buttArr: null,
            };
	}

    componentDidMount() {
        var arr = [];
        var data = null;
        var url = 'http://192.168.1.28:3001/SnacksJson'
        fetch(url).then(response => {
            return response.json();
        })
        .then(myJson => {
            data = myJson;
            data.forEach(info =>{
                var thisButton = <Button 
                style={{backgroundColor: "#ec407a", color: '#faebd7', fontWeight: 'bold'}} 
                variant='contained'
                onClick={this.props.addChip.bind(this, info.Name, "Snacks", info.UnitPrice)}
                size='large'>{info.Name}</Button>;
        arr.push(thisButton);
    })
        this.setState({buttArr: arr});     
    })
    .catch((error) => {
        console.error(error);
    });
    }

    render() {
        var disp = this.state.buttArr ? this.state.buttArr.map(button => <div style={{ padding: 5}}> {button} </div>) : <div/>;
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