import React, { SyntheticEvent, useState } from "react";
import styled from "styled-components";

import { useMedia } from "@core/hooks";

import LeftArrowIcon from "src/pokemon/assets/icons/icon-arrow-left.svg";
import RightArrowIcon from "src/pokemon/assets/icons/icon-arrow-right.svg";


const Slide: React.FC<any> = (props) => {
  const [slidePosition, setSlidePosition] = useState(0);
  const mobile = useMedia("(max-width: 31.25rem)");

  const slideNavigation = ({ currentTarget }: SyntheticEvent) => {
    const direction = (currentTarget as HTMLButtonElement).value;

    direction === "next"
      ? setSlidePosition(slidePosition <= -87.5 ? -87.5 : slidePosition - 12.5)
      : setSlidePosition(slidePosition === 0 ? 0 : slidePosition + 12.5);
  };

  return (
    <Container>
      {!mobile && (
        <Button
          value="prev"
          onClick={slideNavigation}
          disabled={slidePosition === 0 && true}
        >
          <LeftArrowIcon />
        </Button>
      )}
      <Slider>
        <Content slidePosition={slidePosition}>
          {props.children}
        </Content>
      </Slider>
      {!mobile && (
        <Button
          value="next"
          onClick={slideNavigation}
          disabled={slidePosition === -87.5 && true}
        >
          <RightArrowIcon />
        </Button>
      )}
    </Container>
  );
};

export default Slide

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Slider = styled.div`
  max-width: 23rem;
  overflow: hidden;

  @media (max-width: 31.25rem) {
    max-width: 100%;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      width: 1rem;
    }

    &::-webkit-scrollbar-track {
      background: #060b28;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #2f5aff;
      border-radius: 0.5rem;
      border: 0.25rem solid #060b28;
    }
  }
`;

const Content = styled.div<{ slidePosition: number }>`
  display: flex;
  gap: 0.5rem;
  transform: translateX(${(props) => `${props.slidePosition}rem`});
  transition: 0.4s;
`;

const Button = styled.button`
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 2rem;
    height: 2rem;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: default;
  }
`;