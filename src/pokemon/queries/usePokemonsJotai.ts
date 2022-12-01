import { useAtom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { currentPageAtom } from 'pokemon/atoms/pokemonFilter';
import getPokemons, { GET_POKEMONS_API, GetPokemonsRequest, GetPokemonsResponse } from 'pokemon/services/getPokemons';
import { useMemo } from 'react';
import { UseQueryOptions } from '@tanstack/react-query';

type UsePokemonsKey = [string, GetPokemonsRequest];
type UsePokemonsConfig = UseQueryOptions<GetPokemonsResponse, unknown, GetPokemonsResponse, UsePokemonsKey>;

const usePokemonsJotai = (req: GetPokemonsRequest, config?: UsePokemonsConfig) => {
  const [, queryAtom] = useMemo(
    () =>
      atomsWithQuery((get) => {
        const defaultReq = get(currentPageAtom);
        const request = req || defaultReq;
        const fetchPokemonDetail = () => getPokemons(request);

        return {
          queryKey: [GET_POKEMONS_API, request],
          queryFn: fetchPokemonDetail,
          cacheTime: 600_000,
          staleTime: 300_000,
          ...config,
        };
      }),
    [config, req]
  );

  const [query, _dispatch] = useAtom(queryAtom);

  return query;
};

export default usePokemonsJotai;
