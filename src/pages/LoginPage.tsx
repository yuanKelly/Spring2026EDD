import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/home');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900 px-4">
      <div className="w-full max-w-md bg-navy-800 rounded-2xl p-8 border border-navy-600 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gold-400 mb-2">🕵️ Agent Login</h1>
          <p className="text-gray-400">Enter your credentials to access your mission</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-300 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
              placeholder="agent@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 mb-1 text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
              placeholder="Enter your secret code"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? 'Accessing...' : 'Access Mission'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          New agent?{' '}
          <Link to="/signup" className="text-gold-400 hover:text-gold-500 font-medium">
            Create your profile
          </Link>
        </p>
      </div>
    </div>
  );
}
