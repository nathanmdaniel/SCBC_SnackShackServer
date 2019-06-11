import React from 'react';
import XLSX from 'xlsx';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';




class ClothingButtons extends React.Component {
	

    constructor(props) {
        super(props);
        console.log("this was clicked")
        this.genButtons = this.genButtons.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        console.log(this.genButtons);
        console.log(this.genButtons());
        this.state = {
            buttArr: null,
        };
	}

    componentDidMount() {
        var arr = [];
        var data = null;
        var url = 'http://localhost:3001/json'
        fetch(url).then(response => {
            return response.json();
        })
        .then(myJson => {
            data = myJson;
            data.forEach(info =>{
                console.log(this);
                console.log(info);
                var thisButton = <Button style={{backgroundColor:"#8d6e63", color: '#faebd7', fontWeight: 'bold'}} variant='contained' size='large'>{info.Name}</Button>;
            arr.push(thisButton);
        })
        console.log(arr);
        this.setState({buttArr: arr});     
    })
    .catch((error) => {
        console.error(error);
    });   
        console.log(this.state)
    }

    genButtons() {
		
    }

		render() {
        console.log(this.state.buttArr);
        var disp = this.state.buttArr ? this.state.buttArr.map(button => <div style={{ padding: 5}}> {button} </div>) : <div/>;
		    console.log(disp);
		    return (
                <div style={{ padding: 20 }}>
			   <Grid container>
               <div>
				 {disp}
               </div>
			   </Grid>
			 </div>
		);
	}
}

export default ClothingButtons;