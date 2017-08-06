import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Circle = ({ coords: { x, y }, delay }) => {
  const StyledCircle = styled.div`
    position: absolute;
    background-color: red;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    left: ${x}px;
    top: ${y}px;
    transition: left 0.4s ease-in-out, top 0.4s ease-in-out;
    transition-delay: ${delay}ms;
  `;
  return <StyledCircle />;
};

Circle.propTypes = {
  coords: PropTypes.object.isRequired,
  delay: PropTypes.number.isRequired,
};

Circle.defaultProps = {
  coords: { x: 0, y: 0},
};

export default Circle;
