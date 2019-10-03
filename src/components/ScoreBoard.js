import React from 'react';
import PropTypes from 'prop-types';

const ScoreBoard = ({ scores }) => {
  const { player1, player2 } = scores;

  return (
    <div className="container">
      <div>
        <span>Player 1: </span>
        {' '}
        <span className="wins">Wins</span>
        {' '}
        <strong id="o_win">{player1.wins}</strong>
        {' '}
        <span className="losses">Losses</span>
        {' '}
        <strong id="o_win">{player1.losses}</strong>
      </div>

      <div>
        <span>Player 2: </span>
        {' '}
        <span className="wins">Wins</span>
        {' '}
        <strong id="x_win">{player2.wins}</strong>
        {' '}
        <span className="losses">Losses</span>
        {' '}
        <strong id="x_win">{player2.losses}</strong>
      </div>
    </div>
  )
};

ScoreBoard.propTypes = {
  scores: PropTypes.instanceOf(Object).isRequired,
};

export default ScoreBoard;
