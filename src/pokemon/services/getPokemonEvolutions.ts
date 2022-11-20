import { pokemonApiInstance } from "@core/services"

export interface EvolutionDetail {
  gender: null
  heldItem: null
  item: null
  knownMove: null
  knownMoveType: null
  location: null
  minAffection: null
  minBeauty: null
  minHappiness: null
  minLevel: number
  needsOverworldRain: boolean
  partySpecies: null
  partyType: null
  relativePhysicalStats: null
  timeOfDay: string
  trade_species: null
  trigger: {
    name: string
    url: string
  }
  turn_upside_down: boolean
}

export interface Species {
  name: string
  url: string
}

export interface PokemonEvolution {
  babyTriggerItem: string | null
  evolutionDetail: EvolutionDetail[]
  isBaby: boolean
  species: Species
  evolvesTo: PokemonEvolution[]
}

export interface GetPokemonEvolutionsRequest {
  /**
   * Pokemon ID,
   * ex: 1
   */
  id: number
}


export type GetPokemonEvolutionsResponse = {
  chain: PokemonEvolution
}

export const GET_POKEMON_EVOLUTIONS_API = '/v2/evolution-chain'

const getPokemonEvolutions = async (request: GetPokemonEvolutionsRequest) => {

  const url = `${GET_POKEMON_EVOLUTIONS_API}/${request.id}`

  const result = await pokemonApiInstance.get<GetPokemonEvolutionsResponse>(url)

  return result.data
}

export default getPokemonEvolutions