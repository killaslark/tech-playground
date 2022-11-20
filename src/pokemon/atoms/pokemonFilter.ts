import { atom } from "jotai"

const FILTER_DEFAULT_VALUE = {
  searchQuery: '',
  type: '',
  paging: {
    itemPerPage: 9,
    currentPage: 1,
  }
}

interface PokemonFilter {
  searchQuery: string,
  type: string
  paging: {
    itemPerPage: number,
    currentPage: number,
  }
}

const pokemonFilter = atom<PokemonFilter>(FILTER_DEFAULT_VALUE)

export const currentPageAtom = atom(
  (get) => get(pokemonFilter).paging,
  (get, set, newPaging: PokemonFilter['paging']) => {
    const currentState = get(pokemonFilter)
    set(pokemonFilter, {
      ...currentState,
      paging: {
        ...currentState.paging,
        ...newPaging,
      }
    })
  }
)

export const pokemonTypeAtom = atom(
  (get) => get(pokemonFilter).type,
  (get, set, newType: string) => {
    const currentState = get(pokemonFilter)
    set(pokemonFilter, {
      ...currentState,
      type: newType,
    })
  }
)

export const pokemonSearchQueryAtom = atom(
  (get) => get(pokemonFilter).searchQuery,
  (get, set, searchQuery: string) => {
    const currentState = get(pokemonFilter)
    set(pokemonFilter, {
      ...currentState,
      searchQuery,
    })
  }
)

export default pokemonFilter