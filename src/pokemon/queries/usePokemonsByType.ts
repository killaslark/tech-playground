import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import getPokemonsByType, { GetPokemonsByTypeRequest, GetPokemonsByTypeResponse, GET_POKEMONS_BY_TYPE_API } from "pokemon/services/getPokemonsByType";

type UsePokemonsByTypeKey = [string, GetPokemonsByTypeRequest]

type UsePokemonsByTypeConfig = UseQueryOptions<
  GetPokemonsByTypeResponse,
  any,
  GetPokemonsByTypeResponse,
  UsePokemonsByTypeKey
>

const usePokemonsByType = (request: GetPokemonsByTypeRequest, config?: UsePokemonsByTypeConfig) => {
  const queryKey = [GET_POKEMONS_BY_TYPE_API, request]
  const fetchPokemonDetail = () => getPokemonsByType(request)

  const query = useQuery(queryKey, fetchPokemonDetail, {
    ...config,
    cacheTime: 600_000,
    staleTime: 300_000,
    enabled: !!request?.type,
  })

  return {
    ...query,
    queryKey
  }
}
export default usePokemonsByType;