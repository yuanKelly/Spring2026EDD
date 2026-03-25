import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { units } from '../data/units';
import AgentBriefing from '../components/tutorial/AgentBriefing';

const cityPositions: Record<string, { x: string; y: string }> = {
  'unit-1': { x: '48%', y: '30%' },   // Paris
  'unit-2': { x: '25%', y: '35%' },   // New York
  'unit-3': { x: '80%', y: '38%' },   // Tokyo
  'unit-4': { x: '55%', y: '48%' },   // Cairo
  'unit-5': { x: '82%', y: '72%' },   // Sydney
  'unit-6': { x: '50%', y: '55%' },   // Secret HQ
};

const statusColors: Record<string, string> = {
  locked: 'bg-gray-600 border-gray-500',
  'not-started': 'bg-agent-blue border-blue-400',
  'in-progress': 'bg-gold-500 border-gold-400',
  completed: 'bg-agent-green border-green-400',
};

const statusIcons: Record<string, string> = {
  locked: '🔒',
  'not-started': '📍',
  'in-progress': '⏳',
  completed: '✅',
};

export default function HomePage() {
  const { user, profile, logout, setTutorialCompleted } = useAuth();
  const { progress, loading } = useProgress();
  const navigate = useNavigate();
  const showTutorial = profile && !profile.hasCompletedTutorial;

  const handleUnitClick = (unitId: string) => {
    const unitProgress = progress?.units[unitId];
    if (unitProgress?.status === 'locked') return;
    navigate(`/unit/${unitId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-900">
        <div className="text-gold-400 text-2xl animate-pulse">Loading world map...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col">
      {showTutorial && (
        <AgentBriefing
          agentName={user?.displayName || 'Agent'}
          onComplete={setTutorialCompleted}
        />
      )}

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-navy-800 border-b border-navy-600">
        <div>
          <h1 className="text-gold-400 font-bold text-xl">Math Agent HQ</h1>
          <p className="text-gray-400 text-sm">Welcome, Agent {user?.displayName}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-gray-400 text-sm">
            {progress
              ? `${Object.values(progress.units).filter((u) => u.status === 'completed').length}/6 missions complete`
              : ''}
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-navy-700 hover:bg-navy-600 text-gray-300 rounded-lg transition text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* World Map */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <motion.h2
          className="text-3xl font-bold text-white mb-2 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          World Mission Map
        </motion.h2>
        <p className="text-gray-400 mb-8 text-center">Select a city to begin your mission</p>

        {/* Map container */}
        <div className="relative w-full max-w-4xl aspect-[16/9] bg-navy-800 rounded-2xl border border-navy-600 overflow-hidden">
          {/* Simple world map background lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M10,40 Q30,20 50,35 Q70,50 90,30" stroke="#fbbf24" fill="none" strokeWidth="0.3" />
            <path d="M15,60 Q40,50 60,65 Q80,55 95,60" stroke="#fbbf24" fill="none" strokeWidth="0.3" />
          </svg>

          {/* Connection lines between cities */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="25" y1="35" x2="48" y2="30" stroke="#334155" strokeWidth="0.3" strokeDasharray="1,1" />
            <line x1="48" y1="30" x2="55" y2="48" stroke="#334155" strokeWidth="0.3" strokeDasharray="1,1" />
            <line x1="55" y1="48" x2="80" y2="38" stroke="#334155" strokeWidth="0.3" strokeDasharray="1,1" />
            <line x1="80" y1="38" x2="82" y2="72" stroke="#334155" strokeWidth="0.3" strokeDasharray="1,1" />
          </svg>

          {/* City pins */}
          {units.map((unit, index) => {
            const pos = cityPositions[unit.id];
            const unitProgress = progress?.units[unit.id];
            const status = unitProgress?.status || 'not-started';
            const isLocked = status === 'locked';

            return (
              <motion.button
                key={unit.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 group`}
                style={{ left: pos.x, top: pos.y }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.15, type: 'spring' }}
                onClick={() => handleUnitClick(unit.id)}
                disabled={isLocked}
              >
                {/* Pin */}
                <div
                  className={`w-12 h-12 rounded-full ${statusColors[status]} border-2 flex items-center justify-center text-xl shadow-lg transition-transform ${
                    isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-110'
                  }`}
                >
                  {statusIcons[status]}
                </div>

                {/* Label */}
                <div
                  className={`absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-navy-700 px-3 py-1 rounded-lg text-sm border border-navy-600 ${
                    isLocked ? 'text-gray-500' : 'text-white'
                  }`}
                >
                  <p className="font-bold">{unit.city}</p>
                  <p className="text-xs text-gray-400">{unit.title}</p>
                  {unitProgress?.timesCompleted ? (
                    <p className="text-xs text-agent-green">Completed {unitProgress.timesCompleted}x</p>
                  ) : null}
                </div>

                {/* Pulse animation for available missions */}
                {!isLocked && status !== 'completed' && (
                  <div className="absolute inset-0 w-12 h-12 rounded-full bg-gold-400/30 animate-ping" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-6 flex-wrap justify-center">
          {[
            { status: 'not-started', label: 'Available' },
            { status: 'in-progress', label: 'In Progress' },
            { status: 'completed', label: 'Completed' },
            { status: 'locked', label: 'Locked' },
          ].map(({ status, label }) => (
            <div key={status} className="flex items-center gap-2 text-gray-400 text-sm">
              <div className={`w-4 h-4 rounded-full ${statusColors[status]} border`} />
              {label}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
