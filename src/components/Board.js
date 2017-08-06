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
    // get initial 3 circles. one R dominant, G Dominant, B dominant;
    const circles = [];
    circles.push(this.getRGB('r'));
    circles.push(this.getRGB('g'));
    circles.push(this.getRGB('b'));
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
  getRGB(dominantColor) {
    let r;
    let g;
    let b;
    switch (dominantColor) {
      case 'r':
        r = this.getRandom(150, 256);
        g = this.getRandom(0, 256);
        b = this.getRandom(0, 256);
      break;
      case 'g':
        r = this.getRandom(0, 256);
        g = this.getRandom(255, 256);
        b = this.getRandom(0, 256);
      break;
      default:
        r = this.getRandom(0, 256);
        g = this.getRandom(0, 256);
        b = this.getRandom(150, 256);
    }
    return { r, g, b };
  }

  getMixedColor = (color1, color2) => {
    const color1Larger = color1 >= color2;
    const diff = Math.floor(Math.abs((color1 - color2) / 2));
    return color1Larger ? color1 - diff : color1 + diff;
  };

  // to util func
  getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // rm later.
  // addCircle = () => {
  //   const { circles } = this.state;
  //   const nextCircle = {
  //     color: this.getRGB(),
  //   };
  //   this.setState({
  //     circles: [...circles, nextCircle],
  //   });
  // };

  getNextEntry = () => {
    const { circles } = this.state;
    const max = circles.length;
    const firstColor = this.getRandom(0, max);
    let secondColor = this.getRandom(0, max);
    while (secondColor === firstColor) {
      secondColor = this.getRandom(0, max);
    }

    const nextEntry = {};
    Object.keys(circles[0]).forEach((key) => {
      nextEntry[key] = this.getMixedColor(circles[firstColor][key], circles[secondColor][key]);
    });

    this.setState({
      circles: [...circles, nextEntry],
    });
  };

  render() {
    const { circles } = this.state;
    if (!circles) return null;
    const step = (2 * Math.PI) / circles.length;
    return (
      <div>
        <StyledBoard>
          {circles.map(({ r, g, b }, idx) => {
            const x = this.getXCoord(idx, step);
            const y = this.getYCoord(idx, step);
            return (
              <Circle
                key={`${r}, ${g}, ${b}`}
                nextEntry={idx === circles.length - 1}
                color={{ r, g, b }}
                coords={{ x, y }}
                delay={(idx * 200) + 200}
              />
            );
          })}
        </StyledBoard>
        <button onClick={this.getNextEntry}>Click to add circle</button>
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


/*
grab 2 of the RGBs at random
get their halfway color
  for each number of rgba
    find difference between them / 2
    add that # to the lower of the two numbers (or subtract from higher of 2)
 */
