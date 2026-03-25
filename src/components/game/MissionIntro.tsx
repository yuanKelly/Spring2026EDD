import { motion } from 'framer-motion';
import type { Unit } from '../../types';
import PlaceholderImage from '../ui/PlaceholderImage';

interface MissionIntroProps {
  unit: Unit;
  onContinue: () => void;
}

export default function MissionIntro({ unit, onContinue }: MissionIntroProps) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-navy-900 px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="max-w-2xl w-full bg-navy-800 rounded-2xl p-8 border border-gold-400/30 shadow-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="text-center mb-6">
          <motion.div
            className="inline-block mb-4 px-4 py-1 bg-agent-red/20 border border-agent-red rounded-full text-agent-red text-sm font-bold tracking-widest"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
          >
            CLASSIFIED MISSION
          </motion.div>
          <h1 className="text-3xl font-bold text-gold-400 mb-2">
            {unit.city}, {unit.country}
          </h1>
          <p className="text-gray-400 text-sm">Mission: {unit.title}</p>
        </div>

        <div className="flex justify-center mb-6">
          <PlaceholderImage
            width={300}
            height={180}
            label={`${unit.city} Background`}
            bgColor="#1e293b"
          />
        </div>

        <motion.p
          className="text-gray-200 text-lg leading-relaxed mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {unit.missionIntroText}
        </motion.p>

        <motion.button
          onClick={onContinue}
          className="w-full py-4 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl text-xl transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Accept Mission
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
