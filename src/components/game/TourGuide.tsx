import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProblemSolvingTip } from '../../types';
import PlaceholderImage from '../ui/PlaceholderImage';

interface TourGuideProps {
  contactName: string;
  tip: ProblemSolvingTip;
  onContinue: () => void;
}

function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}{!done && <span className="typing-cursor" />}</span>;
}

export default function TourGuide({ contactName, tip, onContinue }: TourGuideProps) {
  const [showTip, setShowTip] = useState(false);

  return (
    <motion.div
      className="flex-1 flex relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 80%, rgba(26, 34, 66, 0.6) 0%, #060818 70%)',
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Content overlay */}
      <div className="relative z-10 flex-1 flex items-end" style={{ padding: '0.5in 0.75in 0.5in 0.5in' }}>

        {/* Character */}
        <motion.div
          className="shrink-0 self-end"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          <PlaceholderImage
            width={320}
            height={400}
            label={contactName}
            bgColor="#121833"
          />
        </motion.div>

        {/* Speech bubble + button */}
        <div className="flex-1 flex flex-col" style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
          {/* Name label */}
          <h2
            className="text-2xl font-bold mb-3"
            style={{
              fontFamily: "'Fredoka', sans-serif",
              background: 'linear-gradient(135deg, #fbbf24, #fcd34d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {contactName}
          </h2>

          {/* Speech bubble */}
          <div className="relative" style={{ marginBottom: '1.25rem' }}>
            {/* Tail pointing left — larger, curved look */}
            <div
              className="absolute"
              style={{
                left: '-20px',
                bottom: '2.5rem',
                width: 0,
                height: 0,
                borderTop: '16px solid transparent',
                borderBottom: '16px solid transparent',
                borderRight: '24px solid rgba(18, 24, 51, 0.9)',
                filter: 'drop-shadow(-2px 0 4px rgba(0,0,0,0.2))',
              }}
            />
            <div
              className="dossier overflow-auto"
              style={{
                padding: '2rem 2.5rem',
                borderRadius: '2rem',
                maxHeight: '50vh',
              }}
            >
              <AnimatePresence mode="wait">
                {!showTip ? (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-gray-200 text-lg" style={{ lineHeight: '1.9' }}>
                      <TypewriterText
                        text={`Welcome, Agent! Before we begin, let me teach you a powerful technique: the ${tip.title}. This will help you crack any word problem!`}
                      />
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="strategy"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3
                      className="font-bold text-xl mb-3"
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        color: '#fbbf24',
                      }}
                    >
                      {tip.title}
                    </h3>
                    <p className="text-gray-300" style={{ marginBottom: '1.25rem', lineHeight: '1.7' }}>{tip.description}</p>
                    <ol style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {tip.steps.map((step, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start text-gray-200"
                          style={{ gap: '0.75rem' }}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.2 }}
                        >
                          <span
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                            style={{
                              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                              color: '#060818',
                            }}
                          >
                            {i + 1}
                          </span>
                          <span style={{ lineHeight: '1.6', paddingTop: '0.2rem' }}>{step}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action button */}
          {!showTip ? (
            <motion.button
              onClick={() => setShowTip(true)}
              className="w-full text-white font-bold transition text-lg"
              style={{
                padding: '1rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn the {tip.title}
            </motion.button>
          ) : (
            <motion.button
              onClick={onContinue}
              className="w-full text-midnight-950 font-bold transition text-lg"
              style={{
                padding: '1rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                boxShadow: '0 4px 20px rgba(251, 191, 36, 0.3)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Got it! Let's start!
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
