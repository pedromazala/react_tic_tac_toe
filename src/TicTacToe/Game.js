/**
 * Created by pedromazala on 04/05/17.
 */
import React from 'react';

import {Board} from './Board';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: new Array(9).fill(null),
                xIsNext: true,
            }],
            xIsNext: true,
        };
    }

    jumpTo(move) {
        const history = this.state.history.slice(0, move + 1);
        const current = history[history.length - 1];

        this.setState({
            history: history,
            xIsNext: !current.xIsNext
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Move #' + move :
                'Game start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.applyMove(squares, this.state.xIsNext);
    }

    applyMove(squares, xIsNext) {
        const history = this.state.history;

        this.setState({
            history: history.concat([{
                squares: squares,
                xIsNext: xIsNext
            }]),
            xIsNext: !xIsNext
        });
    }
}