import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import PokemonGrid from "@/components/PokemonGrid";
import { Pokemon } from "@/types/pokemon";

const fetchPokemons = async (limit: number = 24) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await response.json();
  
  // Fetch detailed data for each Pokemon
  const detailedPokemon = await Promise.all(
    data.results.map(async (pokemon: any) => {
      const res = await fetch(pokemon.url);
      const pokemonData = await res.json();
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        types: pokemonData.types.map((type: any) => ({
          name: type.type.name
        })),
        height: pokemonData.height / 10,
        weight: pokemonData.weight / 10,
        sprites: {
          front_default: pokemonData.sprites.front_default
        },
        stats: {
          speed: pokemonData.stats.find((stat: any) => stat.stat.name === 'speed')?.base_stat || 0
        },
        base_experience: pokemonData.base_experience
      };
    })
  );

  return detailedPokemon;
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  
  const { data: pokemon, isLoading, isError } = useQuery({
    queryKey: ["pokemon"],
    queryFn: () => fetchPokemons(24),
  });
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  useEffect(() => {
    if (!pokemon) return;
    
    if (!searchQuery) {
      setFilteredPokemon(pokemon);
      return;
    }
    
    const filtered = pokemon.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredPokemon(filtered);
  }, [searchQuery, pokemon]);
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-500 to-purple-900 font-poppins overflow-y-auto pb-12">
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        <PokemonGrid 
          pokemon={filteredPokemon || []}
          isLoading={isLoading}
          isError={isError}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default Home; 