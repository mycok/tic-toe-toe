import React from 'react';
import PropTypes from 'prop-types';

import Box from './Box';

const Board = ({ boxes, handleBoxClick }) => (
    <div className="board">
        {
            boxes.map((box, index) => (
                <Box
                    key={`box-${index}`}
                    index={index}
                    value={box}
                    clickHandler={handleBoxClick}
                />
            ))
        }
    </div>
);

Board.propTypes = {
    boxes: PropTypes.instanceOf(Array).isRequired,
    handleBoxClick: PropTypes.func.isRequired
}
export default Board;



