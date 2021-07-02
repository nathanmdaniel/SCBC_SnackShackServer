import React from 'react';
import XLSX from 'xlsx';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {SERVER_IP_ADDR} from '../../../../Constants';




class ClothingButtons extends React.Component {
	

    constructor(props) {
        super(props);
        this.state = {
            buttArr: null,
        };
	}

    componentDidMount() {
        var arr = [];
        var data = null;
        // var url = 'http://192.168.1.16:3001/MerchJson'
        // var url = 'http://localhost:3001/MerchJson'
        // var CONSTANTS = require('../../../../Constants/server_ip_const');
        // var url = CONSTANTS.IP_ADDR_CONST + 'MerchJson';
        var url = SERVER_IP_ADDR + 'MerchJson';
        fetch(url).then(response => {
            return response.json();
        })
        .then(myJson => {
            data = myJson;
            data.forEach(info =>{
                if (info.Stock > 0) {
                    var thisButton = <Button 
                    style={{backgroundColor:"#8d6e63", color: '#faebd7', fontWeight: 'bold'}} 
                    variant='contained'
                    onClick={this.props.addChip.bind(this, info.Name, "Merchandise", info.UnitPrice)}
                    key={info.Name}
                    size='large'>{info.Name}</Button>;
                    arr.push(thisButton);
                }
        })
        this.setState({buttArr: arr});     
    })
    .catch((error) => {
        console.error(error);
        console.error("testing here")
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

export default ClothingButtons;