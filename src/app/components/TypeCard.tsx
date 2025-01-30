"use client"

import { useTypeCardAnimation } from "../hooks/useTypeCardAnimation"
import Link from "next/link"

interface TypeCardProps {
  name: string
  index: number
}

export function TypeCard({ name, index }: TypeCardProps) {
  const cardRef = useTypeCardAnimation(index)

  const getTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      normal: "from-gray-400 to-gray-500",
      fire: "from-red-500 to-orange-500",
      water: "from-blue-500 to-blue-600",
      grass: "from-green-500 to-green-600",
      electric: "from-yellow-400 to-yellow-500",
      ice: "from-blue-200 to-blue-300",
      fighting: "from-red-700 to-red-800",
      poison: "from-purple-500 to-purple-600",
      ground: "from-yellow-600 to-yellow-700",
      flying: "from-indigo-400 to-indigo-500",
      psychic: "from-pink-500 to-pink-600",
      bug: "from-lime-500 to-lime-600",
      rock: "from-yellow-800 to-yellow-900",
      ghost: "from-purple-700 to-purple-800",
      dragon: "from-indigo-700 to-indigo-800",
      dark: "from-gray-700 to-gray-800",
      steel: "from-gray-500 to-gray-600",
      fairy: "from-pink-300 to-pink-400",
    }
    return colors[type] || "from-gray-400 to-gray-500"
  }

  return (
    <Link href={`/types/${name}`} passHref>
      <div
        ref={cardRef}
        className={`cursor-pointer rounded-xl overflow-hidden shadow-lg bg-gradient-to-br ${getTypeColor(name)} transition-transform hover:scale-105 active:scale-95`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white capitalize mb-2">{name}</h2>
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-sm">Click to see Pokémon</span>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <img
                src={`/type-icons/${name}.svg`}
                alt={`${name} type`}
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

