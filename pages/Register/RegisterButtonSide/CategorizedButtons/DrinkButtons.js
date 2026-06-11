import React from 'react';
import XLSX from 'xlsx';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { DRINKS_JSON_URL } from '../../../../config';


    class DrinkButtons extends React.Component {
	

        constructor(props) {
            super(props);
            this.state = {
                buttArr: null,
            };
        }

            componentDidMount() {
                var arr = [];
                var data = null;
                var url = DRINKS_JSON_URL
                fetch(url).then(response => {
                    return response.json();
                })
                .then(myJson => {
                    data = myJson;
                    data.forEach(info =>{
                        var thisButton = <Button 
                        style={{backgroundColor: "#26a69a", color: '#faebd7', fontWeight: 'bold'}} 
                        variant='contained'
                        onClick={this.props.addChip.bind(this, info.Name, "Drinks", info.UnitPrice)}
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


export default DrinkButtons;