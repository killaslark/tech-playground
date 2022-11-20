import { useMemo } from 'react'

import { GetNextPageParamFunction, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query'
import getPokemons, { GetPokemonsRequest, GetPokemonsResponse, GET_POKEMONS_API } from 'pokemon/services/getPokemons'

type UseInfinitePokemonsKeys = [string, GetPokemonsRequest]
type UseInfinitePokemonsOptions = UseInfiniteQueryOptions<
  GetPokemonsResponse,
  any,
  GetPokemonsResponse,
  GetPokemonsResponse,
  UseInfinitePokemonsKeys
>

const useInfinitePokemons = (request: GetPokemonsRequest, config?: UseInfinitePokemonsOptions) => {
  const queryKey = [GET_POKEMONS_API, request];

  const fetchPokemon = ({ pageParam = 1 }) => {
    return getPokemons({ ...request, currentPage: pageParam })
  }

  const getNextPageParam: GetNextPageParamFunction<GetPokemonsResponse> = (lastPage, allPages) => {
    const itemPerPage = request.itemPerPage || 10
    const totalLastPageResults = lastPage?.results.length
    const totalAllPages = allPages?.length

    if (totalLastPageResults === itemPerPage) {
return totalAllPages + 1
}
  }

  const query = useInfiniteQuery(queryKey, fetchPokemon, {
    getNextPageParam,
    ...config,
    cacheTime: 600_000,
    staleTime: 300_000,
  });



  const pokemons = useMemo(() => {
    const pages = query?.data?.pages || [];
    return pages.reduce((acc: GetPokemonsResponse['results'], currentRes) => {
      const currentPokemons = currentRes.results || [];
      return [...acc, ...currentPokemons];
    }, []);
  }, [query?.data]);

  return {
    ...query,
    pokemons,
    queryKey,
  }
}

export default useInfinitePokemons;
