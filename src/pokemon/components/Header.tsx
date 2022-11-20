import Link from "next/link";

import styled from "styled-components";

import PokemonLogo from "pokemon/assets/logos/logo-pokemon.svg";

const Header = () => {
  return (
    <div className="main-container">
      <Container>
        <Link href={'/pokemon'}>
          <PokemonLogo />
        </Link>
      </Container>
    </div>
  );
};

export default Header

const Container = styled.header`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;

  & > svg {
    width: 9.56rem;
    height: 3.5rem;
  }

  @media (max-width: 31.25rem) {
    & > svg {
      width: 8.19rem;
      height: 3rem;
    }
  }
`;
