import React, { Component, Fragment } from 'react';

import Board from './Board';
import ResetButton from './ResetButton';
import ScoreBoard from './ScoreBoard';
import Storage from '../Storage';
import { winner, checkIfAllBoxesAreClicked } from '../utils';
import popper from '../utils/popper';

class Game extends Component {
    storage = new Storage();

    state = {
        boxes: Array(9).fill(null),
        next: true,
        prevScores: this.storage.get()
    };

    static getDerivedStateFromProps(state) {
        const newScores = new Storage().get();
        if (state.prevScores !== newScores){
            return {
                prevScores: newScores
            };
        }
        return null;
    }
    
    handleBoxClick = (index) => {
        const { boxes, next } = this.state;
        const boxesClone = boxes.slice();
        
        // check if the board contains a winning combination and if so, stop the game
        if (winner(boxesClone) || boxesClone[index]) {
            return;
        }

        // check if all boxes on the board are clicked and if so, stop the user from making any more moves
        if (checkIfAllBoxesAreClicked(boxesClone)) {
            return;
        }

        // mark boxes with either X or O on every button click
        boxesClone[index] = next ? 'X' : 'O';

        this.setState({
            boxes: boxesClone,
            next: !next,
        });
    }
    // called whenever the game stops. win, tie or loss to reset the board
    handleBoardReset = () => {
        this.setState({
            boxes: Array(9).fill(null),
            next: true
        });
    }

    render() {
        const { boxes, next, prevScores } = this.state;
        const currentWinner = winner(boxes);
        const filledBoxes = checkIfAllBoxesAreClicked(boxes);

        let message;

        if (currentWinner) {
            if (currentWinner === 'X') {
                this.storage.update({
                    player1: { wins: prevScores.player1.wins + 1, losses: prevScores.player1.losses  },
                    player2: { wins: prevScores.player2.wins, losses: prevScores.player2.losses + 1 }
                });

            } else {
                this.storage.update({
                    player1: { wins: prevScores.player1.wins, losses: prevScores.player1.losses + 1 },
                    player2: { wins: prevScores.player2.wins + 1, losses: prevScores.player2.losses }
                });
            }

            message = `${currentWinner === 'X' ? 'Player 1' : 'Player 2'} Wins`;
            popper(message, 'success', this.handleBoardReset);

        } else if (!currentWinner && filledBoxes) {
            message = 'It is a Tie';
            popper(message, 'info', this.handleBoardReset);

        } else {
            message = `${next ? 'Player 1' : 'Player 2'}'s turn`;
        }

        return (
            <Fragment>
                <h3>Tic-Tac-Toe</h3>
                <div className="container">
                    <h3 className="wins">{message}</h3>
                    <Board boxes={boxes} handleBoxClick={this.handleBoxClick} /> 
                </div>
                <ScoreBoard scores={prevScores} />
                <ResetButton clickHandler={this.handleBoardReset} />
            </Fragment>
        );
    }
};

export default Game;



