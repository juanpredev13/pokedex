export interface PokemonType {
  name: string
  url: string
}

export interface PokemonTypesResponse {
  count: number
  results: PokemonType[]
}

export interface PokemonAbility {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface PokemonDetails {
  id: number
  name: string
  sprites: {
    front_default: string
    other?: {
      "official-artwork"?: {
        front_default: string
      }
    }
  }
  abilities: PokemonAbility[]
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
}

export interface PokemonState {
  types: PokemonType[]
  pokemonList: PokemonDetails[]
  loading: boolean
  error: string | null
  selectedType: string | null
  currentPage: number
  totalPages: number
}

