import React from 'react';
import styled from 'styled-components';

const Circle = () => {
  const StyledCircle = styled.div`
    background-color: red;
    height: 50px;
    width: 50px;
    border-radius: 50%;
  `;
  return <StyledCircle />;
};

export default Circle;
