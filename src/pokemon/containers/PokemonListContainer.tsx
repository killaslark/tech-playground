import React from 'react';

import { useAtom } from 'jotai';

import UpArrowIcon from "pokemon/assets/icons/icon-arrow-up.svg";
import pokemonModal from 'pokemon/atoms/pokemonModal';
import { Header, Pokedex, PokemonModal, SearchBar } from 'pokemon/components';

const PokemonListContainer = () => {
  const [modalState] = useAtom(pokemonModal)

  const showModal = !!modalState?.activePokemon


  const scrollToSearchBar = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <React.Fragment>
      <Header />
      <SearchBar />
      <Pokedex />
      {showModal && <PokemonModal />}
      <button
        className="button"
        style={{
          background: '#2f5aff',
          border: 'none',
          position: 'fixed',
          bottom: '1rem',
          right: '1rem'
        }}
        onClick={scrollToSearchBar}
      >
        <UpArrowIcon />
      </button>
    </React.Fragment>
  )

}

export default PokemonListContainer;
