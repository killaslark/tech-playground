import getPokemons, { GET_POKEMONS_API, GetPokemonsRequest, GetPokemonsResponse } from 'pokemon/services/getPokemons';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UsePokemonsKey = [string, GetPokemonsRequest];

type UsePokemonsConfig = UseQueryOptions<GetPokemonsResponse, unknown, GetPokemonsResponse, UsePokemonsKey>;

const usePokemons = (request: GetPokemonsRequest, config?: UsePokemonsConfig) => {
  const queryKey = [GET_POKEMONS_API, request];
  const fetchPokemonDetail = () => getPokemons(request);

  const query = useQuery(queryKey, fetchPokemonDetail, {
    ...config,
    cacheTime: 600_000,
    staleTime: 300_000,
  });

  return {
    ...query,
    queryKey,
  };
};
export default usePokemons;
