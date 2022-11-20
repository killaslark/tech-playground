import { pokemonApiInstance } from '@core/services'

export interface Language {
  name: string
  url: string
}

export interface FlavorTextEntry {
  flavorText: string
  language: Language
}

export interface PokemonSpecies {
  baseHappiness: number
  captureRate: number
  flavorTextEntries: FlavorTextEntry[]
  evolutionChain: {
    name: string;
    url: string;
  }
}

export interface GetPokemonSpeciesDetailRequest {
  /**
   * Pokemon Name,
   * ex: bulbasaur
   */
  name: string
}

export type GetPokemonSpeciesDetailResponse = PokemonSpecies

export const GET_POKEMON_SPECIES_DETAIL_API = '/v2/pokemon-species'

const getPokemonSpeciesDetail = async (request: GetPokemonSpeciesDetailRequest) => {

  const url = `${GET_POKEMON_SPECIES_DETAIL_API}/${request.name}`

  const result = await pokemonApiInstance.get<GetPokemonSpeciesDetailResponse>(url)

  return result.data
}

export default getPokemonSpeciesDetail