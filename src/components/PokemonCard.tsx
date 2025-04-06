import { Pokemon, PokemonType } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-square bg-gradient-to-b from-gray-50 to-gray-100">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-full h-full object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold capitalize mb-2 flex items-center">
          <span className="text-gray-500 mr-2">#{pokemon.id.toString().padStart(3, '0')}</span>
          <span className="text-blue-800">{pokemon.name}</span>
        </h3>
        <div className="flex gap-2 flex-wrap mb-3">
          {pokemon.types.map((type: PokemonType) => (
            <span key={type} className={`type-badge ${type}`}>
              {type}
            </span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm bg-gray-50 p-2 rounded-lg">
          {pokemon.stats.slice(0, 4).map((stat) => (
            <div key={stat.stat.name} className="flex justify-between">
              <span className="font-medium capitalize text-gray-600">{stat.stat.name}:</span>
              <span className="font-semibold text-blue-700">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}