import { motion } from 'framer-motion';
import type { Unit } from '../../types';
import PlaceholderImage from '../ui/PlaceholderImage';

interface CodePieceRevealProps {
  unit: Unit;
  onContinue: () => void;
}

export default function CodePieceReveal({ unit, onContinue }: CodePieceRevealProps) {
  const pieceNumber = parseInt(unit.id.split('-')[1]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-navy-900 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-lg w-full text-center">
        <motion.div
          className="mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1, delay: 0.3 }}
        >
          <div className="inline-block p-6 bg-navy-800 rounded-2xl border-2 border-gold-400 shadow-2xl shadow-gold-400/20">
            <PlaceholderImage
              width={150}
              height={150}
              label={`Code Piece ${pieceNumber}`}
              bgColor="#1e293b"
            />
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-gold-400 mb-3"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {unit.id === 'unit-6' ? 'Mission Complete!' : `Code Piece ${pieceNumber} Collected!`}
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {unit.id === 'unit-6'
            ? 'You have decoded the entire secret message! You are a true Math Agent!'
            : `Great work in ${unit.city}! You have earned a piece of the secret code.`}
        </motion.p>

        <motion.p
          className="text-gray-500 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {unit.id === 'unit-6'
            ? '🌟 All 5 code pieces + final challenge complete! 🌟'
            : `${pieceNumber}/5 code pieces collected`}
        </motion.p>

        {/* Confetti-style dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: ['#fbbf24', '#dc2626', '#2563eb', '#16a34a'][i % 4],
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1, 0], opacity: [1, 1, 0], y: [0, -100] }}
            transition={{ delay: 0.5 + i * 0.1, duration: 1.5 }}
          />
        ))}

        <motion.button
          onClick={onContinue}
          className="py-4 px-8 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl text-xl transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Summary
        </motion.button>
      </div>
    </motion.div>
  );
}
