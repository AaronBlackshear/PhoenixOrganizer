import React from 'react'
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;

  >div .spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default function LoadingScreen() {
  return (
    <LoadingContainer>
      <div className="spin">
        LOADING...
      </div>
    </LoadingContainer>
  )
}
