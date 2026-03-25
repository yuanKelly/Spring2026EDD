import { motion, AnimatePresence } from 'framer-motion';

interface ScoreDisplayProps {
  points: number;
  maxPoints: number;
  lastChange?: number;
}

export default function ScoreDisplay({ points, maxPoints, lastChange }: ScoreDisplayProps) {
  return (
    <div className="flex items-center gap-3 bg-navy-700 px-4 py-2 rounded-xl border border-navy-600">
      <span className="text-gray-300 text-sm">POINTS</span>
      <div className="relative">
        <motion.span
          key={points}
          className="text-gold-400 font-bold text-2xl"
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {points}
        </motion.span>
        <span className="text-gray-500 text-lg">/{maxPoints}</span>
        <AnimatePresence>
          {lastChange !== undefined && lastChange !== 0 && (
            <motion.span
              className={`absolute -top-4 -right-6 text-sm font-bold ${
                lastChange > 0 ? 'text-agent-green' : 'text-agent-red'
              }`}
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
    </div>
  );
}
