import React from 'react'

import { Pokedex, PokemonModal, SearchBar } from 'pokemon/components';

const PokemonListContainer = () => {
  return (
    <React.Fragment>
      <SearchBar />
      <Pokedex />
      <PokemonModal />
    </React.Fragment>
  )

}

export default PokemonListContainer;
