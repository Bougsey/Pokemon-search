import { useState, useEffect } from 'react';
import SearchInput from './components/SearchInput';
import PokemonGrid from './components/PokemonGrid';
import LoadingSpinner from './components/LoadingSpinner';
import { Pokemon } from './types/pokemon';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to transform API data to match our Pokemon type
  const transformPokemonData = (data: any): Pokemon => {
    return {
      id: data.id,
      name: data.name,
      types: data.types.map((type: any) => type.type.name),
      height: data.height / 10, // Convert to meters
      weight: data.weight / 10, // Convert to kg
      sprites: {
        front_default: data.sprites.front_default,
        other: {
          'official-artwork': {
            front_default: data.sprites.other['official-artwork'].front_default
          }
        }
      },
      stats: data.stats.map((stat: any) => ({
        base_stat: stat.base_stat,
        stat: {
          name: stat.stat.name
        }
      })),
      base_experience: data.base_experience
    };
  };

  // Function to fetch Pokémon data
  const fetchPokemonData = async (limit: number = 12) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
      );
      const data = await response.json();
      
      const pokemonDetails = await Promise.all(
        data.results.map(async (p: { url: string }) => {
          const res = await fetch(p.url);
          const pokemonData = await res.json();
          return transformPokemonData(pokemonData);
        })
      );

      setPokemon(pokemonDetails);
    } catch (err) {
      setError('Failed to fetch Pokémon data. Please try again later.');
      console.error('Error fetching Pokémon:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load initial Pokémon when component mounts
  useEffect(() => {
    fetchPokemonData();
  }, []);

  // Handle search
  useEffect(() => {
    if (!searchQuery) {
      fetchPokemonData();
      return;
    }

    const searchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        // First, get all Pokémon to search through
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`
        );
        const data = await response.json();
        
        // Filter Pokémon based on search query
        const filteredPokemon = data.results
          .filter((p: { name: string }) => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 12);

        // Fetch detailed data for filtered Pokémon
        const pokemonDetails = await Promise.all(
          filteredPokemon.map(async (p: { url: string }) => {
            const res = await fetch(p.url);
            const pokemonData = await res.json();
            return transformPokemonData(pokemonData);
          })
        );

        setPokemon(pokemonDetails);
      } catch (err) {
        setError('Failed to fetch Pokémon data. Please try again later.');
        console.error('Error fetching Pokémon:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchPokemon, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 py-8 px-4 relative overflow-hidden">
      {/* Decorative pokeball patterns */}
      <div className="absolute inset-0 bg-white/10 grid grid-cols-6 gap-8 p-8" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-12 h-12 rounded-full border-4 border-white/20 bg-white/5"
          />
        ))}
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Pokémon Tracker</h1>
          <p className="text-white/90">Search and discover your favorite Pokémon</p>
        </header>
        
        <div className="max-w-xl mx-auto mb-8">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search for a Pokémon..."
          />
        </div>
        
        <main className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <PokemonGrid
              pokemon={pokemon}
              isLoading={loading}
              isError={error !== null}
              searchQuery={searchQuery}
            />
          )}
        </main>
        
        <footer className="mt-12 text-center text-white/80 text-sm">
          <p>Data provided by the <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/90 underline">PokéAPI</a></p>
        </footer>
      </div>
    </div>
  );
}
