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
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-gray-400">{label}</span>
          <span
            className="font-bold"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.85rem',
              color: '#fbbf24',
            }}
          >
            {current}/{max}
          </span>
        </div>
      )}
      <div
        className="w-full h-3 rounded-full overflow-hidden"
        style={{
          background: '#1a2242',
          border: '1px solid rgba(37, 48, 82, 0.5)',
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24, #fcd34d)',
            boxShadow: '0 0 12px rgba(251, 191, 36, 0.3)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
