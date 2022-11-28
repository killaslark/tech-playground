import getPokemonDetail, {
  GET_POKEMON_DETAIL_API,
  GetPokemonDetailRequest,
  GetPokemonDetailResponse,
} from 'pokemon/services/getPokemonDetail';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UsePokemonDetailKey = [string, GetPokemonDetailRequest];

type UsePokemonDetailConfig = UseQueryOptions<
  GetPokemonDetailResponse,
  any,
  GetPokemonDetailResponse,
  UsePokemonDetailKey
>;

const usePokemonDetail = (request: GetPokemonDetailRequest, config?: UsePokemonDetailConfig) => {
  const queryKey = [GET_POKEMON_DETAIL_API, request];
  const fetchPokemonDetail = () => getPokemonDetail(request);

  const query = useQuery(queryKey, fetchPokemonDetail, {
    ...config,
    cacheTime: 600_000,
    staleTime: 300_000,
    enabled: typeof config?.enabled === 'boolean' ? config?.enabled && !!request?.name : !!request?.name,
  });

  return {
    ...query,
    queryKey,
  };
};
export default usePokemonDetail;
