import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <div className="flex-1 flex items-center justify-center relative grid-bg" style={{ padding: '0.5in' }}>
      {/* Atmospheric glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="w-full max-w-md dossier rounded-2xl shadow-2xl relative overflow-hidden"
        style={{ padding: '2.5rem 2.5rem 2rem' }}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Corner decorations */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400/30 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-400/30 rounded-bl-lg" />

        <div className="text-center mb-8">
          {/* Shield badge */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{
              background: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(45,212,191,0.1))',
              border: '1px solid rgba(251,191,36,0.25)',
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <span className="text-3xl" style={{ fontFamily: "'Fredoka', sans-serif", color: '#fbbf24' }}>
              M
            </span>
          </motion.div>

          <h1
            className="text-3xl font-bold mb-2"
            style={{
              background: 'linear-gradient(135deg, #fbbf24, #fcd34d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Agent Login
          </h1>
          <p className="text-gray-400" style={{ fontSize: '0.95rem' }}>
            Enter your credentials to access HQ
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div
              className="bg-danger/10 border border-danger/40 text-red-300 rounded-xl p-3 text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {error}
            </motion.div>
          )}

          <div>
            <label htmlFor="email" className="block text-teal-400/80 mb-1.5 text-sm font-medium tracking-wide uppercase" style={{ fontSize: '0.75rem' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-midnight-950 border border-midnight-500 rounded-xl text-white placeholder-gray-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition"
              placeholder="agent@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-teal-400/80 mb-1.5 text-sm font-medium tracking-wide uppercase" style={{ fontSize: '0.75rem' }}>
              Secret Code
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-midnight-950 border border-midnight-500 rounded-xl text-white placeholder-gray-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition"
              placeholder="Enter your secret code"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-midnight-950 font-bold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            style={{
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              boxShadow: '0 4px 20px rgba(251, 191, 36, 0.25)',
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 6px 28px rgba(251, 191, 36, 0.35)' }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Accessing...' : 'Access Mission'}
          </motion.button>
        </form>

        <p className="text-center mt-6 text-gray-500 text-sm">
          New agent?{' '}
          <Link to="/signup" className="text-amber-400 hover:text-amber-300 font-medium transition">
            Create your profile
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
