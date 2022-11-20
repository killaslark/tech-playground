
import { useAtom } from "jotai";

import styled from "styled-components";

import { pokemonTypeAtom } from "pokemon/atoms/pokemonFilter";
import { POKEMON_TYPES } from "pokemon/constants";

import PokemonType from "./PokemonType";
import Slide from "./Slide";

const SearchFilter = () => {
  const [activeType, setActiveType] = useAtom(pokemonTypeAtom)

  const onPressType = (type: string) => {
    if (type === activeType) {
      setActiveType('')
    } else {
      setActiveType(type)
    }
  }
  return (
    <Container>
      <Title>Select Pokemon Type</Title>
      <Slide>
        {POKEMON_TYPES.map(({ name }) => (
          <PokemonType
            isActive={name === activeType}
            key={name}
            type={name}
            reduceTabIndex
            onPress={onPressType}
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