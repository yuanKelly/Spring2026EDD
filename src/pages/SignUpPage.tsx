import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  const inputClass = "w-full py-3 bg-midnight-950 border border-midnight-500 rounded-xl text-white placeholder-gray-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition";
  const inputStyle = { paddingLeft: '0.2in', paddingRight: '0.2in' };
  const labelClass = "block text-teal-400/80 mb-1.5 font-medium tracking-wide uppercase";

  return (
    <div className="flex-1 flex items-center justify-center relative grid-bg" style={{ padding: '0.5in' }}>
      {/* Atmospheric glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(45,212,191,0.05) 0%, transparent 70%)',
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
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-teal-400/30 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-teal-400/30 rounded-bl-lg" />

        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{
              background: 'linear-gradient(135deg, #2dd4bf, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            New Agent
          </h1>
          <p className="text-gray-400" style={{ fontSize: '0.95rem' }}>
            Create your agent profile to join the mission
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-4">
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
            <label htmlFor="name" className={labelClass} style={{ fontSize: '0.75rem' }}>
              Agent Name
            </label>
            <input
              id="name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className={inputClass} style={inputStyle}
              placeholder="What should we call you?"
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass} style={{ fontSize: '0.75rem' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass} style={inputStyle}
              placeholder="agent@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass} style={{ fontSize: '0.75rem' }}>
              Secret Code (Password)
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass} style={inputStyle}
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className={labelClass} style={{ fontSize: '0.75rem' }}>
              Confirm Secret Code
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={inputClass} style={inputStyle}
              placeholder="Type it again"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full mt-4! py-3.5 text-midnight-950 font-bold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            style={{
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              boxShadow: '0 4px 20px rgba(251, 191, 36, 0.25)',
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 6px 28px rgba(251, 191, 36, 0.35)' }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Creating Profile...' : 'Join the Mission'}
          </motion.button>
        </form>

        <p className="text-center mt-6 text-gray-500 text-sm px-4">
          Already an agent?{' '}
          <Link to="/login" className="text-amber-400 hover:text-amber-300 font-medium transition">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
