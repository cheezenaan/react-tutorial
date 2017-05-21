import React from 'react';
import Square from './square';
import { ROWS, COLUMNS } from '../config';

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i].value}
        onClick={() => this.props.onClick(i)}
        highlighted={this.props.squares[i].highlighted}
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
