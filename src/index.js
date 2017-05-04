import React from 'react';
import ReactDOM from 'react-dom';

import {Game} from './TicTacToe/Game';

// import App from './App';
import './index.css';

// class Square2 extends React.Component {
//     render() {
//         return (
//             <button className="square" onClick={() => this.props.onClick()}>
//                 {this.props.value}
//             </button>
//         );
//     }
// }


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
