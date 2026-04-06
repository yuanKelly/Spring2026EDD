import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav
      className="relative border-b border-midnight-600/60"
      style={{
        padding: '0 0.5in',
        background: 'linear-gradient(180deg, #0b0f24 0%, #060818 100%)',
      }}
    >
      {/* Accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #f59e0b, #2dd4bf, #f59e0b, transparent)',
        }}
      />

      <div className="w-full flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => navigate(user ? '/home' : '/login')}
          className="flex items-center gap-3 min-h-0 group"
        >
          {/* Shield icon */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-midnight-950 font-bold text-sm shrink-0"
            style={{
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              boxShadow: '0 0 12px rgba(251, 191, 36, 0.3)',
            }}
          >
            M
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{
              fontFamily: "'Fredoka', sans-serif",
              background: 'linear-gradient(135deg, #fbbf24, #fcd34d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Math Agent HQ
          </span>
        </button>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span
                className="text-sm hidden sm:inline px-3 py-1 rounded-full border border-midnight-500 text-teal-400"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}
              >
                AGENT {user.displayName?.toUpperCase()}
              </span>
              <button
                onClick={handleLogout}
                className="bg-midnight-700 hover:bg-midnight-600 text-gray-300 hover:text-white rounded-lg transition text-sm min-h-0 border border-midnight-500"
                style={{ padding: '0.4rem 1rem' }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/signup')}
                className="text-gray-400 hover:text-white transition text-sm min-h-0"
                style={{ padding: '0.4rem 1rem' }}
              >
                Create Account
              </button>
              <button
                onClick={() => navigate('/login')}
                className="text-midnight-950 font-bold rounded-lg transition text-sm min-h-0"
                style={{
                  padding: '0.4rem 1.2rem',
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  boxShadow: '0 2px 12px rgba(251, 191, 36, 0.25)',
                }}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
