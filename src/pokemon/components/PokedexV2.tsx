import React, { useMemo } from 'react';

import Fuse from 'fuse.js';

import { useAtom } from 'jotai';

import styled from 'styled-components';

import { currentPageAtom, pokemonSearchQueryAtom, pokemonTypeAtom } from 'pokemon/atoms/pokemonFilter';
import { usePokemons, usePokemonsByType } from 'pokemon/queries';

import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import Pagination from './Pagination';
import PokemonCard from './PokemonCard';

const searchKeyweights = [
  {
    name: 'name',
    weight: 1,
  },
  {
    name: 'url',
    weight: 0.9,
  },
];

const PokedexV2: React.FC = () => {
  const [paging] = useAtom(currentPageAtom)
  const [type] = useAtom(pokemonTypeAtom)
  const [query] = useAtom(pokemonSearchQueryAtom)

  const request = {
    itemPerPage: paging?.itemPerPage,
    currentPage: paging?.currentPage,
  }

  const pokemonByPagingQuery = usePokemons(request, {
    enabled: !type,
  })
  const pokemonByTypeQuery = usePokemonsByType({
    type,
  })

  const { isError, isLoading, isFetching } = type ? pokemonByTypeQuery : pokemonByPagingQuery

  const pokemonList = useMemo(() => {
    if (type) {
      const pokemonTypes = pokemonByTypeQuery?.data?.pokemon || []
      return pokemonTypes.map(({ pokemon }) => pokemon).slice(0, 30)
    }

    return pokemonByPagingQuery?.data?.results || []

  }, [type, pokemonByPagingQuery, pokemonByTypeQuery])


  const fuzzyPokemonList = new Fuse(pokemonList, {
    keys: searchKeyweights,
    threshold: 0.4,
    includeMatches: true,
    includeScore: true,
  });

  const searchResult = fuzzyPokemonList.search(query);

  const fuzzyResult = useMemo(() => {
    return searchResult.map(res => res.item);
  }, [searchResult])

  if (isError) {
return <ErrorMessage />;
}

  const usedList = query ? fuzzyResult : pokemonList

  return (
    <PokedexContainer>
      <div className={'main-container'}>
        {isLoading ? (
          <Loading />
        ) : (
          <React.Fragment>
            {usedList.length > 0 ? (
              <React.Fragment>
                <PokemonListContainer>
                  {usedList.map((pokemon) => (
                    <PokemonCard key={pokemon.name} pokemon={pokemon}
                    />
                  ))}
                </PokemonListContainer>
                {!type && <Pagination />}
              </React.Fragment>
            ) : <ErrorMessage />
            }
          </React.Fragment>
        )}
        {isFetching && !isLoading && <Loading />}
      </div>
    </PokedexContainer>
  );
};

export default PokedexV2;


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

