import PokemonCard from "./PokemonCard"
import { Pokemon } from "@/types/pokemon"

interface PokemonGridProps {
  pokemon: Pokemon[]
  isLoading: boolean
  isError: boolean
  searchQuery: string
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ 
  pokemon, 
  isLoading, 
  isError, 
  searchQuery 
}) => {
  // Check if we have no results based on search
  const noResults = searchQuery && pokemon.length === 0 && !isLoading && !isError

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-8" role="alert">
        <p className="font-bold">Error</p>
        <p>Failed to load Pokémon data. Please try again later.</p>
      </div>
    )
  }

  if (noResults) {
    return (
      <div className="text-center mt-8 text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
        <p className="text-xl">No Pokémon found matching your search. Try a different name!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  )
}

export default PokemonGrid 