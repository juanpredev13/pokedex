import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { PokemonDetails } from "../../types/pokemon"

interface PokemonCardProps {
  pokemon: PokemonDetails
  onSelect: (pokemon: PokemonDetails) => void
}

export function PokemonCard({ pokemon, onSelect }: PokemonCardProps) {
  const pokemonId = pokemon.id || pokemon.url.split("/").slice(-2, -1)[0]

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
      onClick={() => onSelect(pokemon)}
    >
      <div className="relative w-full h-48">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
          alt={pokemon.name}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
      </div>
    </motion.div>
  )
}

