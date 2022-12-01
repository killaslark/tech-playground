import getPokemonEvolutions, {
  GET_POKEMON_EVOLUTIONS_API,
  GetPokemonEvolutionsRequest,
  GetPokemonEvolutionsResponse,
} from 'pokemon/services/getPokemonEvolutions';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UsePokemonEvolutionsKey = [string, GetPokemonEvolutionsRequest];

type UsePokemonEvolutionsConfig = UseQueryOptions<
  GetPokemonEvolutionsResponse,
  unknown,
  GetPokemonEvolutionsResponse,
  UsePokemonEvolutionsKey
>;

const usePokemonEvolutions = (request: GetPokemonEvolutionsRequest, config?: UsePokemonEvolutionsConfig) => {
  const queryKey = [GET_POKEMON_EVOLUTIONS_API, request];
  const fetchPokemonEvolutions = () => getPokemonEvolutions(request);

  const query = useQuery(queryKey, fetchPokemonEvolutions, {
    ...config,
    cacheTime: 600_000,
    staleTime: 300_000,
    enabled: !!request?.id,
  });

  return {
    ...query,
    queryKey,
  };
};
export default usePokemonEvolutions;
