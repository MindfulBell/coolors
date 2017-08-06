import PropTypes from 'prop-types';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const Circle = ({ color, coords: { x, y }, delay }) => {
  const slideOut = keyframes`
    from {
      transform: translate(225px, 225px);
    }
    to {
      transform: translate(${x}px, ${y}px);
    }
  `;
  const StyledCircle = styled.div`
    position: absolute;
    background-color: ${color};
    height: 50px;
    width: 50px;
    border-radius: 50%;
    top: 0;
    transition: box-shadow 200ms linear;
    transform: translate(225px, 225px);
    animation: 300ms ease-in-out ${delay}ms ${slideOut};
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 5px 8px grey;
    }
  `;
  return <StyledCircle />;
};

Circle.propTypes = {
  coords: PropTypes.object.isRequired,
  delay: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

Circle.defaultProps = {
  coords: { x: 0, y: 0 },
};

export default Circle;
