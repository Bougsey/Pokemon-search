import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface PokemonDetails {
  name: string
  height: number
  weight: number
  types: Array<{
    type: {
      name: string
    }
  }>
  sprites: {
    front_default: string
  }
  stats: Array<{
    base_stat: number
    stat: {
      name: string
    }
  }>
}

function PokemonDetail() {
  const { id } = useParams<{ id: string }>()

  const { data: pokemon, isLoading, error } = useQuery<PokemonDetails>({
    queryKey: ['pokemon', id],
    queryFn: async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      return response.data
    }
  })

  if (isLoading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-600">Error loading Pokemon details</div>
  if (!pokemon) return null

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto w-48 h-48"
        />
        <h1 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <p>Height: {pokemon.height / 10}m</p>
          <p>Weight: {pokemon.weight / 10}kg</p>
          <div className="mt-2">
            <span className="font-semibold">Types: </span>
            {pokemon.types.map(type => (
              <span
                key={type.type.name}
                className="inline-block px-2 py-1 bg-gray-200 rounded mr-2 capitalize"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Stats</h2>
          {pokemon.stats.map(stat => (
            <div key={stat.stat.name} className="mb-2">
              <div className="flex justify-between capitalize">
                <span>{stat.stat.name}:</span>
                <span>{stat.base_stat}</span>
              </div>
              <div className="w-full bg-gray-200 rounded">
                <div
                  className="bg-red-600 rounded h-2"
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail 