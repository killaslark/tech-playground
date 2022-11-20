import React from 'react';

import { useRouter } from 'next/router';

import { ErrorMessage, PokemonDetailBanner, PokemonDetailStatusCard, PokemonEvolutions } from 'pokemon/components';
import { usePokemonDetail } from 'pokemon/queries';

const PokemonDetailContainer = () => {
  const router = useRouter()

  const pokemonName = router.query?.name as string;

  const request = {
    name: pokemonName
  }
  const { data, isError } = usePokemonDetail(request)

  if (!data || isError) {
    return <ErrorMessage />
  }

  return (
    <React.Fragment>
      <PokemonDetailBanner />
      <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
        <PokemonDetailStatusCard />
      </div>
      <div style={{ marginTop: '1rem', justifyContent: 'center', display: 'flex', flex: 1 }}>
        <PokemonEvolutions />
      </div>
    </React.Fragment>
  );
}

export default PokemonDetailContainer;
