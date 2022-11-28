import Fuse from 'fuse.js';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { pokemonSearchQueryAtom } from 'pokemon/atoms/pokemonFilter';
import { usePokemonsByType } from 'pokemon/queries';
import React, { useMemo } from 'react';
import styled from 'styled-components';
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

const PokedexByType: React.FC = () => {
  const [query] = useAtom(pokemonSearchQueryAtom);

  const router = useRouter();
  const type = router?.query?.type as string;

  const pokemonByTypeQuery = usePokemonsByType({
    type,
  });

  const { isError, isLoading, isFetching } = pokemonByTypeQuery;

  const pokemonList = pokemonByTypeQuery?.data?.pokemon?.map(({ pokemon }) => pokemon) || [];

  const fuzzyPokemonList = new Fuse(pokemonList, {
    keys: searchKeyweights,
    threshold: 0.4,
    includeMatches: true,
    includeScore: true,
  });

  const searchResult = fuzzyPokemonList.search(query);

  const fuzzyResult = useMemo(() => {
    return searchResult.map((res) => res.item);
  }, [searchResult]);

  if (isError) {
    return <ErrorMessage />;
  }

  const usedList = query ? fuzzyResult : pokemonList;

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
                    <PokemonCard key={pokemon.name} pokemon={pokemon} />
                  ))}
                </PokemonListContainer>
                {!type && <Pagination />}
              </React.Fragment>
            ) : (
              <ErrorMessage />
            )}
          </React.Fragment>
        )}
        {isFetching && !isLoading && <Loading />}
      </div>
    </PokedexContainer>
  );
};

export default PokedexByType;

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
