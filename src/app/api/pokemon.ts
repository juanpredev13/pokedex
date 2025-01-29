const BASE_URL = "https://pokeapi.co/api/v2"

export async function getPokemonTypes() {
  const response = await fetch(`${BASE_URL}/type`)
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon types")
  }
  return response.json()
}

export async function getPokemonByType(type: string) {
  const response = await fetch(`${BASE_URL}/type/${type}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon of type ${type}`)
  }
  return response.json()
}

export async function getPokemonDetails(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon details")
  }
  return response.json()
}

