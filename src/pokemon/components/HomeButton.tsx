
import styled from "styled-components";

import HomeIcon from 'pokemon/assets/icons/icon-home.svg'


const HomeButton = () => {
  return (
    <Button className="button">
      <HomeIcon />
      Home
    </Button>
  )
}

export default HomeButton;


const Button = styled.button`
  grid-area: HomeButton;
  justify-self: start;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: wait;
  }
`;