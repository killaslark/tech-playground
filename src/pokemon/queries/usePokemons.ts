import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import getPokemons, { GetPokemonsRequest, GetPokemonsResponse, GET_POKEMONS_API } from 'pokemon/services/getPokemons';

type UsePokemonsKey = [string, GetPokemonsRequest]

type UsePokemonsConfig = UseQueryOptions<
  GetPokemonsResponse,
  any,
  GetPokemonsResponse,
  UsePokemonsKey
>

const usePokemons = (request: GetPokemonsRequest, config?: UsePokemonsConfig) => {
  const queryKey = [GET_POKEMONS_API, request]
  const fetchPokemonDetail = () => getPokemons(request)

  const query = useQuery(queryKey, fetchPokemonDetail, {
    ...config,
    cacheTime: 600_000,
    staleTime: 300_000,
  })

  return {
    ...query,
    queryKey
  }
}
export default usePokemons;