import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Circle from './Circle';

const StyledBoard = styled.div`
  height: 500px;
  width: 500px;
  position: relative;
  background: lightblue;
  border: 1px solid orange;
  left: calc(50% - 250px);
  top: 15%;
`;
class Board extends Component {
  static PropTypes = {
    circles: PropTypes.array.isRequired,
  };
  static defaultProps = {
    circles: [],
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.radius = 100;
  }

  componentDidMount() {
    this.getCircles();
  }

  getCircles() {
    const circles = [];
    for (let i = 0; i < 3; i++) {
      circles.push({
        color: this.getRGB(),
      });
    }
    this.setState({
      circles,
    });
  }

  getXCoord(idx, step) {
    return Math.round(500 / 2 + this.radius * Math.cos(idx * step) - 50 / 2);
  }

  getYCoord(idx, step) {
    return Math.round(500 / 2 + this.radius * Math.sin(idx * step) - 50 / 2);
  }

  // to util func
  getRGB() {
    return `rgb(${this.getRandom()}, ${this.getRandom()}, ${this.getRandom()})`;
  }

  // to util func
  getRandom = () => {
    const min = Math.ceil(1);
    const max = Math.floor(255);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  addCircle = () => {
    const { circles } = this.state;
    const nextCircle = {
      color: this.getRGB(),
    };
    this.setState({
      circles: [...circles, nextCircle],
    });
  };

  render() {
    const { circles } = this.state;
    if (!circles) return null;
    const step = (2 * Math.PI) / circles.length;
    return (
      <div>
        <StyledBoard>
          {circles.map(({ color }, idx) => {
            const x = this.getXCoord(idx, step);
            const y = this.getYCoord(idx, step);
            return (
              <Circle key={color} color={color} coords={{ x, y }} delay={(idx * 200) + 200} />
            );
          })}
        </StyledBoard>
        <button onClick={this.addCircle}>Click to add circle</button>
      </div>
    );
  }
}

export default Board;

/*
hard coded values that need to be a constant/changeable:

width / height of board 500
width / height of each circle 50px
radius of board 100
 */
