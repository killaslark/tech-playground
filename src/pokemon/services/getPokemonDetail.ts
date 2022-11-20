import { pokemonApiInstance } from '@core/services'


export interface PokemonStatus {
  baseStat: number
  stat: {
    name: string
  }
}

export interface PokemonType {
  type: {
    name: string
  }
}

export interface Sprites {
  backDefault: string | null
  backFemale: string | null
  backShiny: string | null
  backShinyFemale: string | null
  frontDefault: string | null
  frontFemale: string | null
  frontShiny: string | null
  frontShinyFemale: string | null
  other: {
    home: {
      frontDefault: string | null
      frontFemale: string | null
      frontShiny: string | null
      frontShinyFemale: string | null
    }
  }
}


export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  weight: number;
  height: number;
  stats: PokemonStatus[];
  sprites: Sprites
}

export interface GetPokemonDetailRequest {
  /**
   * Pokemon Name,
   * ex: bulbasaur
   */
  name: string
}

export type GetPokemonDetailResponse = Pokemon

export const GET_POKEMON_DETAIL_API = '/v2/pokemon'

const getPokemonDetail = async (request: GetPokemonDetailRequest) => {

  const url = `${GET_POKEMON_DETAIL_API}/${request.name}`

  const result = await pokemonApiInstance.get<GetPokemonDetailResponse>(url)


  return result.data
}

export default getPokemonDetail