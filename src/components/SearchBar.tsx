import { useState } from "react"
import { Input } from "./ui/input"

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchTerm(query)
    onSearch(query)
  }

  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl font-bold text-white mb-6">Search for a Pokemon</h1>
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Enter a pokemon"
            className="pl-4 pr-10 py-2 w-full rounded-full border-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar 