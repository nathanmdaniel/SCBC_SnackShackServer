import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AccountLookup from './AccountLookup.js';


const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		textAlign: 'left',
		color: theme.palette.text.secondary,
		margin: "15px",
	},
});

function handleClick() {
	console.log("chip clicked");
}

function generateTotal(total) {
    return "$" + total;
}

class TransactionCard extends React.Component {
	constructor(props) {
	    super(props);
	    this.setCamperName = this.setCamperName.bind(this);
	}

    state = {
        camperName: "placeholder",
    };

    setCamperName(name) {
        this.setState( {camperName: name} );
    }

	render() {
		const { classes } = this.props;
		return (
			<Card className={classes.paper}>
			<CardMedia style={{ height: 120}}
			image={require("../../../static/Alligator_Flipped.jpg")}
				component="img"
			  title="Contemplative Reptile"
			/>
			<CardContent>
			  <Typography gutterBottom variant="h5" component="h2">
				Transaction
			  </Typography>
			  <Grid container spacing={2}>
				<Grid item xs={12} style={{minHeight: '250px'}}>
					{this.props.chips}
    			</Grid>
    			<Grid item xs={4}> 
        			<Button fullWidth onClick={this.props.removeClick} style={{backgroundColor:'#ef9a9a', color: '#d50000'}}>
						<SvgIcon>
							<path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
						</SvgIcon>
					</Button>
				</Grid>
				<Grid item xs={4}> </Grid>
				<Grid item xs={4}>  
                    <Typography
				        align='right'
				        style={{color: '#b71c1c'}}
                        variant='h5'
                    >
                        {generateTotal(this.props.transactionTotal.toFixed(2))}
                    </Typography>
                </Grid>
				<Grid item xs={12}> 
                    <AccountLookup setCamperName={this.setCamperName} transactionNum={this.props.transactionNum}/>
                </Grid>
				<Grid item xs={12}>
					<Button fullWidth onClick={this.props.sendClick.bind(this, this.state.camperName)} style={{backgroundColor:'#c5e1a5', color: '#558b2f'}}>
						<SvgIcon>
							<path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
						</SvgIcon>
					</Button>
				</Grid>
			  </Grid>
			</CardContent>
		</Card>
		);
	}
  }

TransactionCard.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionCard);

