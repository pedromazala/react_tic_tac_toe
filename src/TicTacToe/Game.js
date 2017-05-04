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
    const lines = squares.map((column) => {
        const unique = uniqueArray(column);
        if (unique.length === 1) {
            return unique[0];
        }

        return null;
    });
    const linesResult = uniqueArray(notNullArrayValues(lines));
    if (linesResult.length === 1) {
        return linesResult[0];
    }

    const columns = rotateArray(squares).map((line) => {
        const unique = uniqueArray(line);
        if (unique.length === 1) {
            return unique[0];
        }

        return null;
    });
    const columnsResult = uniqueArray(notNullArrayValues(columns));
    if (columnsResult.length === 1) {
        return columnsResult[0];
    }

    const diagonal1 = diagonalArray(squares);
    const diagonal1Result = uniqueArray(diagonal1);
    if (diagonal1Result.length === 1) {
        return diagonal1Result[0];
    }

    const diagonal2 = diagonalArray(squares, 1);
    console.log(diagonal2);
    const diagonal2Result = uniqueArray(diagonal2);
    if (diagonal2Result.length === 1) {
        return diagonal2Result[0];
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