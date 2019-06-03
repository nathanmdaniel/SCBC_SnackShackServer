import React from 'react';
import PropTypes from 'prop-types';
import ClothingButtons from './CategorizedButtons/ClothingButtons.js';
import DrinkButtons from './CategorizedButtons/DrinkButtons.js';
import SnackButtons from './CategorizedButtons/SnackButtons.js';
import FrozenButtons from './CategorizedButtons/FrozenButtons.js';


class ButtonLoader extends React.Component {
    constructor(props) {
        super(props);
    }

    //Maybe put function call in curly braces.

    render() {
        switch(this.props.activeTab) {
            case 0:
                return (
                    <div>
                        <ClothingButtons addChip={this.props.addChip}/>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <SnackButtons addChip={this.props.addChip}/>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <DrinkButtons addChip={this.props.addChip}/>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <FrozenButtons addChip={this.props.addChip}/>
                    </div>
                );
            default:
                return <div/>;
        }
    }
}

    
    ButtonLoader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default ButtonLoader;