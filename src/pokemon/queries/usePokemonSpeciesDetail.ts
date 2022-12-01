import getPokemonSpeciesDetail, {
  GET_POKEMON_SPECIES_DETAIL_API,
  GetPokemonSpeciesDetailRequest,
  GetPokemonSpeciesDetailResponse,
} from 'pokemon/services/getPokemonSpeciesDetail';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UsePokemonSpeciesDetailKey = [string, GetPokemonSpeciesDetailRequest];

type UsePokemonSpeciesDetailConfig = UseQueryOptions<
  GetPokemonSpeciesDetailResponse,
  unknown,
  GetPokemonSpeciesDetailResponse,
  UsePokemonSpeciesDetailKey
>;

const usePokemonSpeciesDetail = (request: GetPokemonSpeciesDetailRequest, config?: UsePokemonSpeciesDetailConfig) => {
  const queryKey = [GET_POKEMON_SPECIES_DETAIL_API, request];
  const fetchPokemonSpeciesDetail = () => getPokemonSpeciesDetail(request);

  const query = useQuery(queryKey, fetchPokemonSpeciesDetail, {
    ...config,
    cacheTime: 600_000,
    staleTime: 300_000,
    enabled: !!request?.name,
  });

  return {
    ...query,
    queryKey,
  };
};

export default usePokemonSpeciesDetail;
