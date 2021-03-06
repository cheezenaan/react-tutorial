import React from 'react';
import Board from './board';

import { COLUMNS } from '../config';
import { calculateWinner } from '../common';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill({ value: null, highlighted: false }),
        location: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      ascending: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i].value) {
      return;
    }

    squares[i] = { value: this.state.xIsNext ? 'X' : 'O', highlighted: false };
    const winLine = calculateWinner(squares);
    if (winLine) {
      winLine.every(j => (squares[j] = { value: squares[j].value, highlighted: true }));
    }
    const x = (i % COLUMNS) + 1;
    const y = Math.floor(i / COLUMNS) + 1;
    this.setState({
      history: history.concat([{
        squares,
        location: { x, y },
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: !(step % 2),
    });
  }

  toggleOrder() {
    this.setState({
      ascending: !this.state.ascending,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winLine = calculateWinner(current.squares);
    const descending = !this.state.ascending;

    const moves = history.map((step, move) => {
      let desc = move ?
        `Move (${step.location.x}, ${step.location.y})` :
        'Game start';
      if (move === this.state.stepNumber) {
        desc = <b>{desc}</b>;
      }
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
    if (descending) {
      moves.sort((a, b) => b.key - a.key);
    }

    let status;
    if (winLine) {
      status = `Winner: ${current.squares[winLine[0]].value}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div><button onClick={() => this.toggleOrder()}>Toggle order</button></div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
