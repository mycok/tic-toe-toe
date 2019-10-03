import React from 'react';
import PropTypes from 'prop-types';

const Box = ({ value, index, clickHandler }) => (
    <div className="box">
        <button
            className="button"
            onClick={() => clickHandler(index)}
        >
            {value}
        </button>
    </div>
);

Box.propTypes = {
    value: PropTypes.string,
    index: PropTypes.number.isRequired,
    clickHandler: PropTypes.func.isRequired
};

Box.defaultProps = {
    value: null
};

export default Box;
