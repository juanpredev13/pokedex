import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../states/store"
import { fetchPokemonTypes } from "../states/pokemonSlice"
import { TypeCard } from "./TypeCard"

export function TypeList() {
  const dispatch = useDispatch<AppDispatch>()
  const { types, loading, error } = useSelector((state: RootState) => state.pokemon)

  useEffect(() => {
    dispatch(fetchPokemonTypes())
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-red-600 p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Pokédex - Choose a Type</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {types.map((type, index) => (
          <TypeCard key={type.name} name={type.name} index={index} />
        ))}
      </div>
    </div>
  )
}

