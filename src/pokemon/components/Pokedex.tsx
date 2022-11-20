
import React, { useEffect, useState } from "react";

import { useAtom } from "jotai";

import styled from "styled-components";

import { currentPageAtom } from "pokemon/atoms/pokemonFilter";
import { useInfinitePokemons } from "pokemon/queries";

import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import PokemonCard from "./PokemonCard";
import { InView } from "react-intersection-observer";

interface Props {

};

const Pokedex: React.FC<Props> = () => {
  const [paging] = useAtom(currentPageAtom)
  const [shouldLoadMore, setShouldLoadMore] = useState(false)

  const request = {
    itemPerPage: paging?.itemPerPage,
  }

  const { isLoading, isError, pokemons, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfinitePokemons(request)

  const pokemonList = pokemons

  useEffect(() => {
    if (shouldLoadMore && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, shouldLoadMore, isFetchingNextPage])

  if (isError) return <ErrorMessage />;

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
        <InView onChange={setShouldLoadMore} />
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

