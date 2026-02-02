import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { apiFetch } from '../lib/api'
import { useAuth } from '../context/AuthContext'

function SignUp() {
  const location = useLocation()
  const state = location.state || {}
  const { login } = useAuth()
  const [username, setUsername] = useState(state.fullName ?? '')
  const [email, setEmail] = useState(state.email ?? '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      const res = await apiFetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name: username, email, password }),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Sign up failed')
      }
      await login(email, password)
      navigate('/account')
    } catch (err) {
      setError(err.message || 'Sign up failed.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-rose-50">
      <div className="bg-white p-10 rounded-xl shadow-md border border-rose-100 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-rose-700 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-3 border border-rose-200 rounded-md bg-white focus:ring-2 focus:ring-rose-300 focus:outline-none"
              required
            />
          </div>

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
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
