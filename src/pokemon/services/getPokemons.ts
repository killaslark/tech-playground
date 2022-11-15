import { pokemonApiInstance } from "@core/services"

export interface PokemonUrl {
  name: string;
  /**
   * url to pokemon detail,
   * ex: https://pokeapi.co/api/v2/pokemon/1/
   */
  url: string
}

export interface GetPokemonsRequest {
  /**
   * current Page
   * start from 1
   */
  currentPage?: number

  itemPerPage?: number
}

export interface GetPokemonsResponse {
  results: PokemonUrl[]
  /**
   * total pokemons
   */
  count: number
}


export const GET_POKEMONS_API = '/v2/pokemon'

const getPokemons = async (request: GetPokemonsRequest) => {
  const currentPage = request?.currentPage || 1
  const itemPerPage = request?.itemPerPage || 10
  const offset = itemPerPage * (currentPage - 1)

  const result = await pokemonApiInstance.get<GetPokemonsResponse>(GET_POKEMONS_API, {
    params: {
      offset,
      limit: itemPerPage,
    }
  })


  return result.data
}

export default getPokemons