"use client"

import { useEffect } from "react"
import { useAppDispatch } from "./hooks/useAppDispatch"
import { useAppSelector } from "./hooks/useAppSelector"
import { fetchPokemonTypes } from "./states/pokemonSlice"
import { TypeCard } from "./components/TypeCard"
import { Logo } from "./components/Logo"
import { LoadingSpinner } from "./components/LoadingSpinner"

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { types, loading, error } = useAppSelector((state) => state.pokemon)

  useEffect(() => {
    dispatch(fetchPokemonTypes())
  }, [dispatch])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 text-red-600 max-w-md w-full text-center shadow-lg">
          <p className="text-xl font-semibold">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-600 to-red-700">
      <div className="container mx-auto px-4 py-8">
        <Logo />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {types.map((type, index) => (
              <TypeCard key={type.name} name={type.name} index={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

