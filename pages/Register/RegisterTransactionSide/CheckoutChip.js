import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';

class CheckoutChip extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <Chip
                label={this.props.label}
                onClick={this.props.handleChipClick.bind(this, this)}
                style={{color: '#283593', width: '100%', fontWeight: 'bold', margin: 1}}
            />);
    }
}

export default CheckoutChip;