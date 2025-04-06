import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface Pokemon {
  name: string
  url: string
}

interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

function PokemonList() {
  const [page, setPage] = useState(1)
  const limit = 20
  const offset = (page - 1) * limit

  const { data, isLoading, error } = useQuery<PokemonListResponse>({
    queryKey: ['pokemonList', page],
    queryFn: async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      return response.data
    }
  })

  if (isLoading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-600">Error loading Pokemon</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pokemon List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.results.map((pokemon) => (
          <Link
            key={pokemon.name}
            to={`/pokemon/${pokemon.url.split('/').slice(-2, -1)[0]}`}
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
          </Link>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={!data?.next}
          className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PokemonList 