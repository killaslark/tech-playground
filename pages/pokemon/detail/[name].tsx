import { GetServerSideProps } from 'next';

import { dehydrate, QueryClient } from '@tanstack/query-core';

import { PokemonDetailContainer } from 'pokemon/containers';
import { getPokemonDetail, getPokemonEvolutions, getPokemonSpeciesDetail } from 'pokemon/services';
import { GET_POKEMON_DETAIL_API } from 'pokemon/services/getPokemonDetail';
import { GET_POKEMON_EVOLUTIONS_API } from 'pokemon/services/getPokemonEvolutions';
import { GET_POKEMON_SPECIES_DETAIL_API, PokemonSpecies } from 'pokemon/services/getPokemonSpeciesDetail';

const PokemonDetailPage = () => {
  return <PokemonDetailContainer />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.query;

  if (!query.name) {
    return {
      redirect: {
        destination: '/pokemon',
        statusCode: 307,
      }
    }
  }

  const queryClient = new QueryClient()

  const request = {
    name: query.name as string,
  }
  const pokemonDetailParams = {
    queryKey: [GET_POKEMON_DETAIL_API, request],
    queryFn: () => getPokemonDetail(request),
  }

  await queryClient.prefetchQuery(pokemonDetailParams)
  await queryClient.prefetchQuery([GET_POKEMON_SPECIES_DETAIL_API, request], () => getPokemonSpeciesDetail(request))

  const pokemon = queryClient.getQueryData<PokemonSpecies>([GET_POKEMON_SPECIES_DETAIL_API, request])

  const url = pokemon?.evolutionChain?.url

  if (url) {
    const id = Number(url.split('/')?.[6])
    const evolutionRequest = {
      id,
    }
    await queryClient.prefetchQuery([GET_POKEMON_EVOLUTIONS_API, evolutionRequest], () => getPokemonEvolutions(evolutionRequest))
  }

  const dehydratedState = dehydrate(queryClient)

  return { props: { dehydratedState } }
}

export default PokemonDetailPage;