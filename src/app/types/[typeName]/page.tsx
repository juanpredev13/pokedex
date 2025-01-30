"use client"

import { useEffect, useState, useCallback } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { fetchPokemonByType, setCurrentPage } from "../../states/pokemonSlice"
import { PokemonCard } from "../../components/PokemonCard"
import { PokemonModal } from "../../components/PokemonModal"
import { LoadingSpinner } from "../../components/LoadingSpinner"
import { SkeletonCard } from "../../components/SkeletonCard"
import { SearchBar } from "../../components/SearchBar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getPokemonDetails } from "../../api/pokemon"
import type { PokemonDetails } from "../../../types/pokemon"

export default function PokemonGridPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const params = useParams()
  const typeName = params.typeName as string
  const { pokemonList, loading, error, currentPage } = useAppSelector((state) => state.pokemon)
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const ITEMS_PER_PAGE = 20
  const totalItems = filteredPokemon.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems)
  const currentPokemon = filteredPokemon.slice(startIndex, endIndex)

  useEffect(() => {
    dispatch(fetchPokemonByType(typeName))
  }, [dispatch, typeName])

  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch(setCurrentPage(newPage))
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
    [dispatch],
  )

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query)
      dispatch(setCurrentPage(1)) 
    },
    [dispatch],
  )

  const handleSelectPokemon = useCallback(async (pokemon: PokemonDetails) => {
    if (!pokemon.abilities) {
      const details = await getPokemonDetails(pokemon.url)
      setSelectedPokemon(details)
    } else {
      setSelectedPokemon(pokemon)
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-red-600 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-lg p-6 text-red-600 max-w-md w-full text-center shadow-lg"
        >
          <p className="text-xl font-semibold">{error}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-600 to-red-700">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-white capitalize ml-2">{typeName} Type Pokémon</h1>
        </motion.div>

        <SearchBar onSearch={handleSearch} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SkeletonCard />
              </motion.div>
            ))
          ) : currentPokemon.length > 0 ? (
            currentPokemon.map((pokemon, index) => (
              <motion.div
                key={pokemon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PokemonCard pokemon={pokemon} onSelect={handleSelectPokemon} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-white text-xl">
              {searchQuery ? "No Pokémon found matching your search." : <LoadingSpinner />}
            </div>
          )}
        </div>

        {!loading && filteredPokemon.length > ITEMS_PER_PAGE && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap justify-center items-center gap-2"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page ? "bg-white text-red-600 font-bold" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        <PokemonModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      </div>
    </main>
  )
}

