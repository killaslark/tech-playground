
import React, { useState } from "react";

import styled from "styled-components";

import { POKEMON_TYPES } from "pokemon/constants";

import PokemonType from "./PokemonType";
import Slide from "./Slide";

const SearchFilter = () => {
  const [, setSelectedType] = useState("");

  return (
    <Container>
      <Title>Select Pokemon Type</Title>
      <Slide>
        {POKEMON_TYPES.map(({ name }) => (
          <PokemonType
            key={name}
            type={name}
            reduceTabIndex
            onPress={setSelectedType}
          />
        ))}
      </Slide>
    </Container>
  );
};

export default SearchFilter

const Container = styled.div`
  grid-area: SearchFilter;
`;

const Title = styled.span`
  font-size: 1.5rem;
  line-height: 135%;
  font-weight: 700;
  display: block;
  margin-bottom: 1rem;
`;