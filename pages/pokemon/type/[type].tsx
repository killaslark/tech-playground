import { GetServerSideProps } from 'next';
import { PokemonListByTypeContainer } from 'pokemon/containers';
import getPokemonsByType, { GET_POKEMONS_BY_TYPE_API } from 'pokemon/services/getPokemonsByType';
import { QueryClient, dehydrate } from '@tanstack/query-core';

const PokemonTypePage = () => {
  return <PokemonListByTypeContainer />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.query;

  if (!query.type) {
    return {
      redirect: {
        destination: '/pokemon',
        statusCode: 307,
      },
    };
  }

  const queryClient = new QueryClient();

  const request = {
    type: query.type as string,
  };
  const pokemonDetailParams = {
    queryKey: [GET_POKEMONS_BY_TYPE_API, request],
    queryFn: () => getPokemonsByType(request),
  };

  await queryClient.prefetchQuery(pokemonDetailParams);

  const dehydratedState = dehydrate(queryClient);

  return { props: { dehydratedState } };
};

export default PokemonTypePage;
