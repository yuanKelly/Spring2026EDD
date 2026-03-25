import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
}

export default function ProgressBar({ current, max, label }: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-300">{label}</span>
          <span className="text-gold-400 font-bold">{current}/{max}</span>
        </div>
      )}
      <div className="w-full h-4 bg-navy-700 rounded-full overflow-hidden border border-navy-600">
        <motion.div
          className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
