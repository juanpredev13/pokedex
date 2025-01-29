import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../states/store"
import { fetchPokemonTypes } from "../states/pokemonSlice"
import { TypeCard } from "../components/TypeCard"
import { Logo } from "../components/Logo"
import gsap from "gsap"

export function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { types, loading, error } = useSelector((state: RootState) => state.pokemon)

  useEffect(() => {
    dispatch(fetchPokemonTypes())

    // Animate the background pattern
    gsap.to(".bg-pattern", {
      rotation: 360,
      duration: 200,
      repeat: -1,
      ease: "none",
    })
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-600">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-600">
        <div className="text-xl text-white bg-red-700 p-4 rounded-lg shadow-lg">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-red-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="bg-pattern absolute inset-0 opacity-10">
        <div className="absolute inset-0 grid grid-cols-10 gap-4">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-white rounded-full" />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Logo />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {types.map((type, index) => (
              <TypeCard key={type.name} name={type.name} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

