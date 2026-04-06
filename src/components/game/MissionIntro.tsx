import { motion } from 'framer-motion';
import type { Unit } from '../../types';

interface MissionIntroProps {
  unit: Unit;
  onContinue: () => void;
}

export default function MissionIntro({ unit, onContinue }: MissionIntroProps) {
  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center relative grid-bg"
      style={{ padding: '0.5in' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(26, 34, 66, 0.8) 0%, #060818 70%)',
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-amber-400/20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Card overlay */}
      <motion.div
        className="relative z-10 max-w-3xl w-full dossier rounded-2xl shadow-2xl overflow-auto max-h-full"
        style={{
          padding: '3rem 3.5rem',
          boxShadow: '0 8px 48px rgba(0,0,0,0.5), 0 0 1px rgba(251,191,36,0.3)',
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-400/30 rounded-tl" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-400/30 rounded-tr" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-400/30 rounded-bl" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400/30 rounded-br" />

        <div className="text-center" style={{ marginBottom: '2rem' }}>
          {/* Classified stamp */}
          <div
            className="inline-block stamp-in mb-6"
            style={{
              padding: '0.4rem 1.5rem',
              border: '2px solid #ef4444',
              borderRadius: '4px',
              color: '#ef4444',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              transform: 'rotate(-12deg)',
              opacity: 0.8,
            }}
          >
            CLASSIFIED MISSION
          </div>

          <h1
            className="text-4xl font-bold mb-3"
            style={{
              fontFamily: "'Fredoka', sans-serif",
              background: 'linear-gradient(135deg, #fbbf24, #fcd34d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {unit.city}, {unit.country}
          </h1>

          <p className="text-teal-400/70 text-base tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}>
            MISSION: {unit.title.toUpperCase()}
          </p>
        </div>

        <motion.p
          className="text-gray-300 text-lg leading-relaxed text-center"
          style={{ margin: '0 1.5rem 2.5rem', lineHeight: '1.85' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {unit.missionIntroText}
        </motion.p>

        <motion.button
          onClick={onContinue}
          className="w-full py-4 text-midnight-950 font-bold rounded-xl text-xl transition"
          style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            boxShadow: '0 4px 24px rgba(251, 191, 36, 0.3)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.02, boxShadow: '0 6px 32px rgba(251, 191, 36, 0.4)' }}
          whileTap={{ scale: 0.98 }}
        >
          Accept Mission
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
