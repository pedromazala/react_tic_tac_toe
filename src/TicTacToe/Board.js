/**
 * Created by pedromazala on 04/05/17.
 */
import React from 'react';

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export class Board extends React.Component {
    renderSquare(i, j) {
        return (
            <Square key={j}
                value={this.props.squares[i][j]}
                onClick={() => this.props.onClick(i, j)}
            />
        );
    }

    render() {
        let rows = new Array(3).fill(new Array(3).fill(null));
        const board = this;
        return (
            <div>
                {rows.map(function (line, i) {
                    return (
                        <div className="board-row" key={i}>
                            {line.map(function (square, j) {
                                return board.renderSquare(i, j);
                            })}
                        </div>
                    )
                })}
                {/*<div className="board-row">*/}
                    {/*{this.renderSquare(0)}*/}
                    {/*{this.renderSquare(1)}*/}
                    {/*{this.renderSquare(2)}*/}
                {/*</div>*/}
                {/*<div className="board-row">*/}
                    {/*{this.renderSquare(3)}*/}
                    {/*{this.renderSquare(4)}*/}
                    {/*{this.renderSquare(5)}*/}
                {/*</div>*/}
                {/*<div className="board-row">*/}
                    {/*{this.renderSquare(6)}*/}
                    {/*{this.renderSquare(7)}*/}
                    {/*{this.renderSquare(8)}*/}
                {/*</div>*/}
            </div>
        );
    }
}