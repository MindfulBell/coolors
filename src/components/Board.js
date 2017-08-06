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
    this.state = {
      circles: [1, 2],
    };
    this.radius = 100;
  }

  addCircle = () => {
    const { circles } = this.state;
    const nextNum = circles[circles.length - 1] + 1;
    this.setState({
      circles: [...circles, nextNum],
    });
  };

  render() {
    const { circles } = this.state;
    const step = (2 * Math.PI) / circles.length;
    return (
      <div>
        <StyledBoard>
          {circles.map((num, idx) => {
            const x = Math.round(500 / 2 + this.radius * Math.cos(idx * step) - 50 / 2);
            const y = Math.round(500 / 2 + this.radius * Math.sin(idx * step) - 50 / 2);
            return (
              <Circle key={num} coords={{ x, y }} delay={(idx * 200) + 200} />
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
 /// Mixin to place items on a circle
 /// @author Hugo Giraudel
 /// @author Ana Tudor
 /// @param {Integer} $item-count - Number of items on the circle
 /// @param {Length} $circle-size - Large circle size
 /// @param {Length} $item-size - Single item size

 @mixin on-circle($item-count, $circle-size, $item-size) {
 position: relative;
 width:  $circle-size;
 height: $circle-size;
 padding: 0;
 border-radius: 50%;
 list-style: none;

 > * {
 display: block;
 position: absolute;
 top:  50%;
 left: 50%;
 width:  $item-size;
 height: $item-size;
 margin: -($item-size / 2);

 $angle: (360 / $item-count);
 $rot: 0;

 @for $i from 1 through $item-count {
 &:nth-of-type(#{$i}) {
 transform:
 rotate($rot * 1deg)
 translate($circle-size / 2)
 rotate($rot * -1deg);
 }

 $rot: $rot + $angle;
 }
 }
 }
 */
