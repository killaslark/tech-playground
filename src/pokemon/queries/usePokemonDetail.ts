import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import getPokemonDetail, { GetPokemonDetailRequest, GetPokemonDetailResponse, GET_POKEMON_DETAIL_API } from "pokemon/services/getPokemonDetail";

type UsePokemonDetailKey = [string, GetPokemonDetailRequest]

type UsePokemonDetailConfig = UseQueryOptions<
  GetPokemonDetailResponse,
  any,
  GetPokemonDetailResponse,
  UsePokemonDetailKey
>

const usePokemonDetail = (request: GetPokemonDetailRequest, config?: UsePokemonDetailConfig) => {
  const queryKey = [GET_POKEMON_DETAIL_API, request]
  const fetchPokemonDetail = () => getPokemonDetail(request)

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

export default usePokemonDetail;