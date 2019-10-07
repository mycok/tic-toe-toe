import React from 'react';
import PropTypes from 'prop-types';

const ScoreBoard = ({ scores }) => {
  const { computer, human } = scores;

  return (
    <div className="container">
      <div>
        <span>Computer: </span>
        {' '}
        <span className="wins">Wins</span>
        {' '}
        <strong id="o_win">{computer.wins}</strong>
        {' '}
        <span className="losses">Losses</span>
        {' '}
        <strong id="o_win">{computer.losses}</strong>
      </div>

      <div>
        <span>Human: </span>
        {' '}
        <span className="wins human">Wins</span>
        {' '}
        <strong id="x_win">{human.wins}</strong>
        {' '}
        <span className="losses">Losses</span>
        {' '}
        <strong id="x_win">{human.losses}</strong>
      </div>
    </div>
  )
};

ScoreBoard.propTypes = {
  scores: PropTypes.instanceOf(Object).isRequired,
};

export default ScoreBoard;
