import { motion, AnimatePresence } from 'framer-motion';

interface ScoreDisplayProps {
  points: number;
  maxPoints: number;
  lastChange?: number;
}

export default function ScoreDisplay({ points, maxPoints, lastChange }: ScoreDisplayProps) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-2.5 rounded-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(18, 24, 51, 0.8), rgba(26, 34, 66, 0.6))',
        border: '1px solid rgba(37, 48, 82, 0.5)',
      }}
    >
      <span
        className="text-sm tracking-wider"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: '#374569',
          fontSize: '0.75rem',
        }}
      >
        POINTS
      </span>
      <div className="relative">
        <motion.span
          key={points}
          className="font-bold text-2xl"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: '#fbbf24',
          }}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {points}
        </motion.span>
        <span className="text-lg" style={{ color: '#374569', fontFamily: "'JetBrains Mono', monospace" }}>
          /{maxPoints}
        </span>
        <AnimatePresence>
          {lastChange !== undefined && lastChange !== 0 && (
            <motion.span
              className="absolute -top-4 -right-6 text-sm font-bold"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: lastChange > 0 ? '#22c55e' : '#ef4444',
              }}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -20 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {lastChange > 0 ? `+${lastChange}` : lastChange}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Progress pips */}
      <div className="flex gap-1 ml-2">
        {[...Array(maxPoints)].map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: 8,
              height: 8,
              backgroundColor: i < points ? '#fbbf24' : '#1a2242',
              boxShadow: i < points ? '0 0 6px rgba(251, 191, 36, 0.4)' : 'none',
            }}
            initial={i === points - 1 && lastChange && lastChange > 0 ? { scale: 0 } : undefined}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          />
        ))}
      </div>
    </div>
  );
}
