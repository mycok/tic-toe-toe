import React, { Component, Fragment } from 'react';

import Board from './Board';
import ResetButton from './ResetButton';
import ScoreBoard from './ScoreBoard';
import Storage from '../utils/Storage';
import { 
    determineWinner,
    checkIfAllBoxesAreClicked,
    computeBestMove
 } from '../utils';
import popper from '../utils/popper';

class Game extends Component {
    storage = new Storage();

    state = {
        boxes: Array(9).fill(null),
        next: true,
        prevScores: this.storage.get(),
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
        
        if (determineWinner(boxesClone) || boxesClone[index]) {
            return;
        }

        if (checkIfAllBoxesAreClicked(boxesClone)) {
            return;
        }

        boxesClone[index] = next && 'X';

        this.setState({
            boxes: boxesClone,
            next: !next,
        }, () => {
            setTimeout(() => {
                this.makeAIMove();
            }, 500);
        });
    }

    handleComputerMove = (index) => {
        const { boxes, next } = this.state;
        const boxesClone = boxes.slice();
        
        if (determineWinner(boxesClone) || boxesClone[index]) {
            return;
        }

        if (checkIfAllBoxesAreClicked(boxesClone)) {
            return;
        }

        boxesClone[index] = !next && 'O';

        this.setState({
            boxes: boxesClone,
            next: !next,
        });
    }

    makeAIMove = () => {
        const { boxes } = this.state;
        const bestMove = computeBestMove(boxes, 'X');

        this.handleComputerMove(bestMove);
    }

    handleBoardReset = () => {
        this.setState({
            boxes: Array(9).fill(null),
            next: true
        });
    }

    handleGameState = (boxes, prevScores, next) => {
        const currentWinner = determineWinner(boxes);
        const filledBoxes = checkIfAllBoxesAreClicked(boxes);

        let message;

        if (currentWinner) {
            if (currentWinner === 'X') {
                this.storage.update({
                    human: { wins: prevScores.human.wins + 1, losses: prevScores.human.losses  },
                    computer: { wins: prevScores.computer.wins, losses: prevScores.computer.losses + 1 }
                });

            } else {
                this.storage.update({
                    human: { wins: prevScores.human.wins, losses: prevScores.human.losses + 1 },
                    computer: { wins: prevScores.computer.wins + 1, losses: prevScores.computer.losses }
                });
            }

            message = `${currentWinner === 'X' ? 'Human Player ' : 'Computer '} Wins`;
            popper(message, 'success', this.handleBoardReset);

        } else if (!currentWinner && filledBoxes) {
            message = 'It is a Tie';
            popper(message, 'info', this.handleBoardReset);

        } else {
            message = `${next ? 'Human Player' : 'Computer'}'s turn`;
        }

        return message;
    }

    render() {
        const { boxes, next, prevScores } = this.state;
        const gameStateMessage = this.handleGameState(boxes, prevScores, next);

        return (
            <Fragment>
                <h3>Tic-Tac-Toe</h3>
                <div className="container">
                    <h3 className="wins">{gameStateMessage}</h3>
                    <Board boxes={boxes} handleBoxClick={this.handleBoxClick} /> 
                </div>
                <ScoreBoard scores={prevScores} />
                <ResetButton clickHandler={this.handleBoardReset} />
            </Fragment>
        );
    }
};

export default Game;



