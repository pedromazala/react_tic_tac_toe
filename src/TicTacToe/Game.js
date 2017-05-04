/**
 * Created by pedromazala on 04/05/17.
 */
import React from 'react';

import {Board} from './Board';

function uniqueArray(notUniqueArray) {
    return notUniqueArray.filter((v, i, a) => a.indexOf(v) === i);
}

function notNullArrayValues(arrayWithNulls) {
    return arrayWithNulls.filter((v, i, a) => v);
}

function rotateArray(array) {
    return array[0].map((x, i) => array.map(x => x[i]));
}

function diagonalArray(array, type = 0) {
    let newArray = new Array(array.length).fill(null);

    for (let i = 0, j = array.length - 1; i < array.length; i++, j--) {
        newArray[i] = array[i][i];
        if (type) {
            newArray[i] = array[i][j];
        }
    }
    return newArray;
}

function calculateWinner(squares) {
    const squareTests = [
        squares,
        rotateArray(squares)
    ];
    for (let i in squareTests) {
        if (!squareTests.hasOwnProperty(i)) {
            continue;
        }

        const tests = squareTests[i].map((uniDimensional) => {
            const unique = uniqueArray(uniDimensional);
            if (unique.length === 1) {
                return unique[0];
            }

            return null;
        });
        const result = uniqueArray(notNullArrayValues(tests));
        if (result.length === 1) {
            return result[0];
        }
    }

    const diagonals = [
        diagonalArray(squares),
        diagonalArray(squares, 1)
    ];
    for (let i in diagonals) {
        if (!diagonals.hasOwnProperty(i)) {
            continue;
        }

        const diagonalResult = uniqueArray(diagonals[i]);
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