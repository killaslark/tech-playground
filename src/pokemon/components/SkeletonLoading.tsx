import React, { useState } from "react";

import styled, { keyframes } from "styled-components";


interface Props {
  src: string;
  alt: string;
  onPress?: () => void
};

const SkeletonLoading: React.FC<Props> = ({ src, alt, onPress }) => {
  const [skeleton, setSkeleton] = useState(true);

  return (
    <Container skeleton={skeleton} hasOnPress={typeof onPress !== 'undefined'}>
      {skeleton && <Skeleton />}
      <img
        onClick={onPress}
        onLoad={() => setSkeleton(false)}
        src={src}
        width="256"
        height="256"
        alt={alt}
      />
    </Container>
  );
};

export default SkeletonLoading


const Container = styled.div<{ skeleton: boolean, hasOnPress: boolean }>`
  display: grid;
  img {
    cursor: ${({ hasOnPress }) => hasOnPress ? 'pointer' : 'default'};
    min-width: 16rem;
    min-height: 16rem;
    grid-area: 1/1;
    opacity: ${({ skeleton }) => (skeleton ? "0" : "1")};
    transition: 0.2s;
  }
`;

const skeletonAnimation = keyframes`
  from {
    background-position: 0;
  }
  to {
    background-position: -200%;
  }
`;

const Skeleton = styled.div`
  grid-area: 1/1;
  height: 100%;
  background-image: linear-gradient(
    90deg,
    #24293f 0px,
    #060b28 50%,
    #24293f 100%
  );
  background-color: #24293f;
  background-size: 200%;
  border-radius: 50%;
  animation: ${skeletonAnimation} 1.5s infinite linear;
`;
