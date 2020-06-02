import React from 'react';
import XLSX from 'xlsx';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


    class FrozenButtons extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                buttArr: null,
            };
        }

    componentDidMount() {
        var arr = [];
        var data = null;
        // var url = 'http://192.168.1.2:3001/FrozenJson'
        var url = 'http://localhost:3001/FrozenJson'
        fetch(url).then(response => {
            return response.json();
        })
        .then(myJson => {
            data = myJson;
            data.forEach(info =>{
                var thisButton = <Button 
                style={{backgroundColor: "#42a5f5", color: '#faebd7', fontWeight: 'bold'}} 
                variant='contained'
                onClick={this.props.addChip.bind(this, info.Name, "Frozen", info.UnitPrice)}
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


export default FrozenButtons;