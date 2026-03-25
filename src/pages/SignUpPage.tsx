import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignUpPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, displayName);
      navigate('/home');
    } catch {
      setError('Could not create account. This email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900 px-4">
      <div className="w-full max-w-md bg-navy-800 rounded-2xl p-8 border border-navy-600 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gold-400 mb-2">🕵️ New Agent</h1>
          <p className="text-gray-400">Create your agent profile to start your mission</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-300 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-gray-300 mb-1 text-sm font-medium">
              Agent Name
            </label>
            <input
              id="name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
              placeholder="What should we call you?"
            />
          </div>

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
              Secret Code (Password)
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-300 mb-1 text-sm font-medium">
              Confirm Secret Code
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
              placeholder="Type it again"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? 'Creating Profile...' : 'Join the Mission'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already an agent?{' '}
          <Link to="/login" className="text-gold-400 hover:text-gold-500 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
