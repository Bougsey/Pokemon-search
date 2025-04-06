import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Pokemon Tracker
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 