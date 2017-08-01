import React, { Component } from 'react';
import Circle from './Circle';

class Board extends Component {
  render() {
    return (
      <div>
        <Circle />
        <Circle />
        <Circle />
      </div>
    );
  }
}

export default Board;
