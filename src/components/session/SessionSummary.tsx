import { motion } from 'framer-motion';
import type { Unit } from '../../types';
import { tips } from '../../data/tips';

interface SessionSummaryProps {
  unit: Unit;
  pointsEarned: number;
  questionsAttempted: number;
  questionsCorrectFirstTry: number;
  startedAt: Date;
  onGoHome: () => void;
}

export default function SessionSummary({
  unit,
  pointsEarned,
  questionsAttempted,
  questionsCorrectFirstTry,
  startedAt,
  onGoHome,
}: SessionSummaryProps) {
  const durationMs = Date.now() - startedAt.getTime();
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  const tip = tips.find((t) => t.id === unit.tipId);
  const accuracy = questionsAttempted > 0 ? Math.round((questionsCorrectFirstTry / questionsAttempted) * 100) : 0;

  const encouragement =
    accuracy >= 80
      ? 'Outstanding work, Agent! You are a natural!'
      : accuracy >= 60
        ? 'Great job, Agent! Keep practicing and you will be unstoppable!'
        : 'Good effort, Agent! Every mission makes you stronger. Try again anytime!';

  const stats = [
    { value: pointsEarned, label: 'Points Earned', color: '#fbbf24' },
    { value: questionsAttempted, label: 'Questions Attempted', color: '#e8e4f0' },
    { value: `${accuracy}%`, label: 'First-Try Accuracy', color: '#22c55e' },
    { value: `${minutes}:${seconds.toString().padStart(2, '0')}`, label: 'Time Spent', color: '#2dd4bf' },
  ];

  return (
    <motion.div
      className="flex-1 flex items-center justify-center overflow-auto"
      style={{ padding: '0.75in' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className="max-w-lg w-full dossier rounded-2xl shadow-2xl"
        style={{
          padding: '2.5rem 3rem',
          boxShadow: '0 8px 48px rgba(0,0,0,0.4)',
        }}
      >
        {/* Header */}
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <div
            className="inline-block rounded-full text-sm font-bold tracking-[0.2em]"
            style={{
              padding: '0.4rem 1.25rem',
              marginBottom: '1.25rem',
              background: 'rgba(251, 191, 36, 0.08)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              color: '#fbbf24',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
            }}
          >
            MISSION SUMMARY
          </div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "'Fredoka', sans-serif", color: '#e8e4f0' }}
          >
            {unit.city}, {unit.country}
          </h1>
          <p className="text-gray-500" style={{ fontSize: '0.95rem' }}>{unit.title}</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '2rem' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-xl text-center"
              style={{
                padding: '1.25rem',
                background: 'rgba(6, 8, 24, 0.5)',
                border: '1px solid rgba(37, 48, 82, 0.4)',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <p
                className="text-3xl font-bold"
                style={{
                  color: stat.color,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {stat.value}
              </p>
              <p className="text-gray-500 text-sm" style={{ marginTop: '0.3rem' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tip practiced */}
        {tip && (
          <motion.div
            className="rounded-xl"
            style={{
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              background: 'rgba(251, 191, 36, 0.04)',
              border: '1px solid rgba(251, 191, 36, 0.1)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-gray-500 text-sm" style={{ marginBottom: '0.25rem' }}>Tip Practiced:</p>
            <p className="text-amber-400 font-bold" style={{ fontFamily: "'Fredoka', sans-serif" }}>{tip.title}</p>
          </motion.div>
        )}

        {/* Encouragement */}
        <motion.p
          className="text-gray-300 text-center text-lg"
          style={{ marginBottom: '2rem', lineHeight: '1.7' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {encouragement}
        </motion.p>

        {/* Return button */}
        <motion.button
          onClick={onGoHome}
          className="w-full text-midnight-950 font-bold rounded-xl transition text-lg"
          style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            boxShadow: '0 4px 20px rgba(251, 191, 36, 0.25)',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Return to World Map
        </motion.button>
      </div>
    </motion.div>
  );
}
