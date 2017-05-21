import React from 'react';
import Square from './square';
import { ROWS, COLUMNS } from '../config';

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderRows(i) {
    const squares = [];
    const start = ROWS * i;
    for (let j = start; j < start + COLUMNS; j += 1) {
      squares.push(this.renderSquare(j));
    }
    return (
      <div key={i} className="board-row">
        {squares}
      </div>
    );
  }

  render() {
    const rows = [];
    for (let i = 0; i < ROWS; i += 1) {
      rows.push(this.renderRows(i));
    }
    return (
      <div>
        <div className="status">{status}</div>
        {rows}
      </div>
    );
  }
}
