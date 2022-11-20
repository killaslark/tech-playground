import { pokemonApiInstance } from "@core/services"

export interface PokemonUrl {
  name: string;
  /**
   * url to pokemon detail,
   * ex: https://pokeapi.co/api/v2/pokemon/1/
   */
  url: string
}

export interface GetPokemonsByTypeRequest {
  type: string
}

export interface GetPokemonsByTypeResponse {
  pokemon: {
    pokemon: PokemonUrl
    slot: number
  }[]
}

export const GET_POKEMONS_BY_TYPE_API = '/v2/type'

const getPokemonsByType = async (request: GetPokemonsByTypeRequest) => {

  const url = `${GET_POKEMONS_BY_TYPE_API}/${request?.type}`
  const result = await pokemonApiInstance.get<GetPokemonsByTypeResponse>(url)


  return result.data
}

export default getPokemonsByType