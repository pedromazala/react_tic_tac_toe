/**
 * Created by pedromazala on 04/05/17.
 */
import React from 'react';

import {Board} from './Board';

Array.prototype.unique = function() {
    return this.filter((v, i, a) => a.indexOf(v) === i);
};

Array.prototype.notEmptyValues = function() {
    return this.filter((v, i, a) => v);
};

Array.prototype.mutate = function() {
    return this[0].map((x, i) => this.map(x => x[i]));
};

Array.prototype.diagonal = function(type) {
    let newArray = new Array(this.length).fill(null);

    for (let i = 0, j = this.length - 1; i < this.length; i++, j--) {
        newArray[i] = this[i][i];
        if (type) {
            newArray[i] = this[i][j];
        }
    }
    return newArray;
};

function calculateWinner(squares) {
    const squareTests = [
        squares,
        squares.mutate()
    ];
    for (let i in squareTests) {
        if (!squareTests.hasOwnProperty(i)) {
            continue;
        }

        const tests = squareTests[i].map((uniDimensional) => {
            const unique = uniDimensional.unique();
            if (unique.length === 1) {
                return unique[0];
            }

            return null;
        });
        const result = tests.notEmptyValues().unique();
        if (result.length === 1) {
            return result[0];
        }
    }

    const diagonals = [
        squares.diagonal(),
        squares.diagonal(1)
    ];
    for (let i in diagonals) {
        if (!diagonals.hasOwnProperty(i)) {
            continue;
        }

        const diagonalResult = diagonals[i].unique();
        if (diagonalResult.length === 1) {
            return diagonalResult[0];
        }
    }

    return null;
}

export class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: new Array(3).fill(new Array(3).fill(null)),
                xIsNext: true,
            }],
            xIsNext: true,
        };
    }

    jumpTo(move) {
        if (move === this.state.history.length - 1) {
            return;
        }
        const history = this.state.history.slice(0, move + 1);
        const current = history[history.length - 1];

        console.log(current);
        this.setState({
            history: history,
            xIsNext: (history.length === 1 ? current.xIsNext : !current.xIsNext)
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
                        onClick={(i, j) => this.handleClick(i, j)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    handleClick(i, j) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice().map(function (row) {
            return row.slice();
        });

        if (calculateWinner(squares) || squares[i][j]) {
            return;
        }
        squares[i][j] = this.state.xIsNext ? 'X' : 'O';

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