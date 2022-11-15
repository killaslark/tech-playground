import { atom } from "jotai";
import { Pokemon } from "pokemon/services/getPokemonDetail";

interface PokemonModal {
  activePokemon: string | null
}

const MODAL_DEFAULT_VALUE = {
  activePokemon: null
}

const pokemonModal = atom<PokemonModal>(MODAL_DEFAULT_VALUE)

export default pokemonModal;
