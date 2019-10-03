import React from 'react';
import PropTypes from 'prop-types';

const ResetButton = ({ clickHandler }) => (
    <div className="container">
        <button
            className="reset"
            onClick={clickHandler}
        >
            Reset
        </button>
    </div>
);

ResetButton.propTypes = {
    clickHandler: PropTypes.func.isRequired
};

export default ResetButton;
