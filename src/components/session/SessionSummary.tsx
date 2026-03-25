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

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-navy-900 px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-lg w-full bg-navy-800 rounded-2xl p-8 border border-navy-600 shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1 bg-gold-400/20 border border-gold-400/30 rounded-full text-gold-400 text-sm font-bold tracking-widest mb-3">
            MISSION SUMMARY
          </div>
          <h1 className="text-2xl font-bold text-white">
            {unit.city}, {unit.country}
          </h1>
          <p className="text-gray-400">{unit.title}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            className="bg-navy-700 rounded-xl p-4 text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-3xl font-bold text-gold-400">{pointsEarned}</p>
            <p className="text-gray-400 text-sm">Points Earned</p>
          </motion.div>
          <motion.div
            className="bg-navy-700 rounded-xl p-4 text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-3xl font-bold text-white">{questionsAttempted}</p>
            <p className="text-gray-400 text-sm">Questions Attempted</p>
          </motion.div>
          <motion.div
            className="bg-navy-700 rounded-xl p-4 text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-3xl font-bold text-agent-green">{accuracy}%</p>
            <p className="text-gray-400 text-sm">First-Try Accuracy</p>
          </motion.div>
          <motion.div
            className="bg-navy-700 rounded-xl p-4 text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-3xl font-bold text-white">{minutes}:{seconds.toString().padStart(2, '0')}</p>
            <p className="text-gray-400 text-sm">Time Spent</p>
          </motion.div>
        </div>

        {tip && (
          <motion.div
            className="bg-navy-700/50 rounded-xl p-4 mb-6 border border-gold-400/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-gray-400 text-sm mb-1">Tip Practiced:</p>
            <p className="text-gold-400 font-bold">{tip.title}</p>
          </motion.div>
        )}

        <motion.p
          className="text-gray-200 text-center text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {encouragement}
        </motion.p>

        <button
          onClick={onGoHome}
          className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl transition text-lg"
        >
          Return to World Map
        </button>
      </div>
    </motion.div>
  );
}
