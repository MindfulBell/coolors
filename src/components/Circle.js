import PropTypes from 'prop-types';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const Circle = ({ color: { r, g, b }, coords: { x, y }, delay, nextEntry, handleCircleClick, position }) => {
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
    background-color: rgb(${r}, ${g}, ${b});
    height: 50px;
    width: 50px;
    border-radius: 50%;
    top: 0;
    transition: box-shadow 200ms linear;
    transform: translate(225px, 225px);
    animation: ${!nextEntry ? `300ms ease-in-out ${delay}ms ${slideOut}` : null};
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 5px 8px grey;
    }
  `;

  const handleClick = () => {
    handleCircleClick(position);
  };
  return <StyledCircle onClick={handleClick} />;
};

Circle.propTypes = {
  coords: PropTypes.object.isRequired,
  delay: PropTypes.number.isRequired,
  color: PropTypes.object.isRequired,
  nextEntry: PropTypes.bool,
  handleCircleClick: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
};

export default Circle;
