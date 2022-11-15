
import React from "react";

import styled from "styled-components";

import AddIcon from "src/pokemon/assets/icons/icon-add.svg";
import UpArrowIcon from "src/pokemon/assets/icons/icon-arrow-up.svg";

import Loading from "./Loading";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import ErrorMessage from "./ErrorMessage";
import { usePokemons } from "pokemon/queries";
import { useAtom } from "jotai";
import { currentPageAtom, pokemonTypeAtom } from "pokemon/atoms/pokemonFilter";

interface Props {

};

const Pokedex: React.FC<Props> = () => {
  const [paging] = useAtom(currentPageAtom)
  const [pokemonType] = useAtom(pokemonTypeAtom)

  const request = {
    itemPerPage: paging?.itemPerPage,
  }
  const { isLoading, pokemons, isFetchingNextPage, fetchNextPage, hasNextPage } = usePokemons(request)

  const { error = false, } = {}
  const pokemonList = pokemons

  const showLoadMore = hasNextPage && !isFetchingNextPage

  const disabledLoadMore = false

  const onPressLoadMore = () => fetchNextPage()

  const scrollToSearchBar = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  if (error) return <ErrorMessage />;

  return (
    <PokedexContainer>
      <div className="main-container">
        {isLoading ? (
          <Loading />
        ) : (
          <PokemonListContainer>
            {pokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon}
              />
            ))}
          </PokemonListContainer>
        )}

        {isFetchingNextPage && <Loading />}

        {showLoadMore && (
          <ButtonContainer>
            <button className="button" onClick={onPressLoadMore} disabled={disabledLoadMore}>
              <AddIcon />
              Show More
            </button>

            <button className="button" onClick={scrollToSearchBar}>
              <UpArrowIcon />
            </button>
          </ButtonContainer>
        )}
      </div>
    </PokedexContainer>
  );
};

export default Pokedex;


const PokedexContainer = styled.div`
  margin-bottom: 9rem;
`;

const PokemonListContainer = styled.div`
  margin: 12.75rem auto 2.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 12.5rem;
  column-gap: 2rem;

  @media (max-width: 61.25rem) {
    grid-template-columns: repeat(2, 1fr);

    div:last-child {
      grid-column: 1/ -1;
    }
  }

  @media (max-width: 40.94rem) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 31.25rem) {
    margin-top: 11.94rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: wait;
  }
`;
