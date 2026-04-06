import { motion } from 'framer-motion';
import type { Unit } from '../../types';
import PlaceholderImage from '../ui/PlaceholderImage';

interface CodePieceRevealProps {
  unit: Unit;
  onContinue: () => void;
}

const confettiColors = ['#fbbf24', '#ef4444', '#3b82f6', '#22c55e', '#2dd4bf', '#a78bfa'];

export default function CodePieceReveal({ unit, onContinue }: CodePieceRevealProps) {
  const pieceNumber = parseInt(unit.id.split('-')[1]);

  return (
    <motion.div
      className="flex-1 flex items-center justify-center overflow-auto relative"
      style={{ padding: '0.75in' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '40%',
          left: '50%',
          width: '60%',
          height: '60%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-lg w-full text-center relative">
        {/* Code piece with glow */}
        <motion.div
          style={{ marginBottom: '2.5rem' }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1, delay: 0.3 }}
        >
          <div
            className="inline-block rounded-2xl"
            style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, #121833, #1a2242)',
              border: '2px solid #fbbf24',
              boxShadow: '0 0 40px rgba(251, 191, 36, 0.2), 0 0 80px rgba(251, 191, 36, 0.05)',
            }}
          >
            <PlaceholderImage
              width={150}
              height={150}
              label={`Code Piece ${pieceNumber}`}
              bgColor="#0b0f24"
            />
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold"
          style={{
            marginBottom: '1.25rem',
            fontFamily: "'Fredoka', sans-serif",
            background: 'linear-gradient(135deg, #fbbf24, #fcd34d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {unit.id === 'unit-6' ? 'Mission Complete!' : `Code Piece ${pieceNumber} Collected!`}
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg"
          style={{ marginBottom: '0.75rem', lineHeight: '1.7' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {unit.id === 'unit-6'
            ? 'You have decoded the entire secret message! You are a true Math Agent!'
            : `Great work in ${unit.city}! You have earned a piece of the secret code.`}
        </motion.p>

        <motion.p
          className="text-midnight-500"
          style={{ marginBottom: '2.5rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {unit.id === 'unit-6'
            ? 'All 5 code pieces + final challenge complete!'
            : `${pieceNumber}/5 code pieces collected`}
        </motion.p>

        {/* Confetti particles */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4 + Math.random() * 6,
              height: 4 + Math.random() * 6,
              backgroundColor: confettiColors[i % confettiColors.length],
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 70}%`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [1, 1, 0],
              y: [0, -80 - Math.random() * 60],
              x: [-20 + Math.random() * 40],
              rotate: [0, 360],
            }}
            transition={{ delay: 0.5 + i * 0.08, duration: 1.5 }}
          />
        ))}

        <motion.button
          onClick={onContinue}
          className="text-midnight-950 font-bold rounded-xl text-xl transition"
          style={{
            padding: '1.1rem 3rem',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            boxShadow: '0 4px 24px rgba(251, 191, 36, 0.3)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 6px 32px rgba(251, 191, 36, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          View Summary
        </motion.button>
      </div>
    </motion.div>
  );
}
