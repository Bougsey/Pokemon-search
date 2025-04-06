import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-500 to-purple-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <Link to="/" className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors">
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound 