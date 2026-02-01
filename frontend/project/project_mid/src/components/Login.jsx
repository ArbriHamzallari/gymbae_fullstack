import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/account')
    } catch (err) {
      setError(err.message || 'Invalid credentials or user not registered.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-rose-50">
      <div className="bg-white p-10 rounded-xl shadow-md border border-rose-100 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-rose-700 mb-6">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border border-rose-200 rounded-md bg-white focus:ring-2 focus:ring-rose-300 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border border-rose-200 rounded-md bg-white focus:ring-2 focus:ring-rose-300 focus:outline-none"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-rose-600 text-white font-semibold rounded-md hover:bg-rose-700 transition-colors"
          >
            Log In
          </button>

          <p className="text-sm text-center text-gray-600 mt-2">
            Don&apos;t have an account? <span className="font-semibold">Sign up from the navbar.</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
